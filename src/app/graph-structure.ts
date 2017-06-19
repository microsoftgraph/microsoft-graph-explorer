// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from "./app.component";
import { GraphService } from "./graph-service";
import { GraphApiVersions, GraphApiVersion } from "./base";
export type GraphNodeLinkTagName = "Property" | "NavigationProperty" | "EntitySet" | "Singleton"

export interface GraphNodeLink {
    isACollection?: boolean
    type: string // corresponds to a possible name of a Graph Entity
    name: string,
    tagName?: GraphNodeLinkTagName
}

export interface GraphEntity {
    name: string
    links: { [Name: string] : GraphNodeLink; };
}

export function parseMetadata(apiService:GraphService, version?:GraphApiVersion):Promise<any> {
    // don't try to download invalid metadata
    if (version && GraphApiVersions.indexOf(version) === -1) {
        return Promise.reject(`invalid version: ${version}`);
    }

    return new Promise((resolve, reject) => {
        if (!version) {
            version = AppComponent.explorerValues.selectedVersion;
        }

        if (!graphStructureCache.containsVersion(version)) {
            console.log(`parsing ${version} metadata`);
            apiService.getMetadata(AppComponent.Options.GraphUrl, version).then((results:any) => {
                const metadata = $($.parseXML(results._body));

                let entitySetData = getEntitySets(metadata);
                graphStructureCache.add(version, "EntitySetData", entitySetData);
                let entityTypeData = getEntityTypes(metadata);
                graphStructureCache.add(version, "EntityTypeData", entityTypeData);
                console.log(`${version} metadata successfully parsed`);
                return resolve();
            }).catch(reject);
        } else {
            // metadata already cached
            return resolve();
        }
    });
}

class GraphStructureCache {
    contents: {
        [version: string] : {
            [content: string] : any
        }
    } = {};

    add(version:string, key:string, content:any) {
        this.contents[version] = this.contents[version] || {};
        this.contents[version][key] = content;
    }

    containsVersion(version:string) {
        return version in this.contents
    }

    contains(version:string, key:string) {
        return this.contents[version] && this.contents[version][key];
    }

    get(version:string, key:string) {
        if (this.contains(version, key)) {
            return this.contents[version][key];
        }
    }
};

const graphStructureCache = new GraphStructureCache();

function getEntitySets(metadata:JQuery) {
    let entitySetsObj = {};
    let entitySetsAndSingletons = metadata.find("EntitySet,SingleTon");
    for(var i=0; i<entitySetsAndSingletons.length; i++){
        var set = entitySetsAndSingletons[i];

        let entitySetOrSingleton:GraphNodeLink = {
            name: set.getAttribute("Name"),
            // singletons like "me" have "Type" instead of "EntityType"
            type: set.getAttribute("EntityType") || set.getAttribute("Type"),
            tagName: set.tagName as GraphNodeLinkTagName
        };

        if (set.tagName === "EntitySet") {
            entitySetOrSingleton.isACollection = true;
        } else if (set.tagName === "Singleton") { 
            entitySetOrSingleton.isACollection = false;
        } else {
            console.error("Found unexpected type in metadata under EntityContainer")
        }

        entitySetsObj[entitySetOrSingleton.name] = entitySetOrSingleton;
    }
    return entitySetsObj;
}


function createEntityTypeObject (DOMarray:Element[]) {
    let entityTypes = {}
    for(let i=0; i<DOMarray.length; i++){
           let EntityType:GraphEntity = {
                name: DOMarray[i].getAttribute("Name"),
                links: {}
           };

           const children = $(DOMarray[i]).children(); // must use $() otherwise in IE .children is undefined
           for (var j=0; j<children.length; j++) {
                if (children[j].attributes.length > 0) {

                    let childName = children[j].getAttribute("Name");
                    let type = children[j].getAttribute("Type");


                    let urlObject:GraphNodeLink = {
                        isACollection: false,
                        name: childName,
                        type: type,
                        tagName: children[j].tagName as GraphNodeLinkTagName
                    };

                    if (type.indexOf("Collection(") === 0) {
                        urlObject.isACollection = true;
                        urlObject.type = type.split("(")[1].split(")")[0]; // Collection("A") => A
                    }

                    EntityType.links[childName] = urlObject;
                }
           }
           entityTypes[EntityType.name] = EntityType;
    }    
    return entityTypes;
}


function getEntityTypes(metadata:any) {
    let entities = {};

    let entityTypes = metadata.find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));

    let complexTypes = metadata.find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));

    return entities;
}

export function getEntityFromTypeName(typePossiblyWithPrefix:string, version:string):GraphEntity {
    const entityTypeData = loadEntityTypeData(version);
    if (!entityTypeData) {
        return null;
    }
    let type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];
}

export function constructGraphLinksFromFullPath(path:string):GraphNodeLink[] {

    const parser = document.createElement('a');
    parser.href = path;

    let urlPathArr = parser.pathname;

    if (!urlPathArr) {
        return [];
    }
    
    let segments:string[] = urlPathArr.split("/");

    if (segments.length <= 2) {
        return [];
    }

    segments.shift(); // remove leading slash
    let version = segments.shift();

    // singletons and entitysets
    let entityContainerData = loadEntitySets(version);

    if (!entityContainerData) {
        return [];
    }
    var graph:GraphNodeLink[] = [];
    while (segments.length > 0) {
        let segment = segments.shift();
        if (graph.length === 0) {
            if (segment in entityContainerData) {
                let node:GraphNodeLink = entityContainerData[segment];
                graph.push(node);
            }
        } else {
            let lastGraphItem = graph[graph.length - 1];
            let lastGraphItemEntity = getEntityFromTypeName(lastGraphItem.type, version);

            if (lastGraphItemEntity === undefined) {
                continue;
            }

            if (lastGraphItemEntity.links !== undefined && segment in lastGraphItemEntity.links) { // me/drive/root
                graph.push(lastGraphItemEntity.links[segment]);
            } else if (lastGraphItem.isACollection && segment !== "") {
                // previous link was a collection, current is an id
                graph.push({
                    isACollection: false,
                    name: segment,
                    type: lastGraphItem.type
                });
            }
        }
    }
    return graph;
}

// urlOptions are like ["driveType", "quota"]
function combineUrlOptionsWithCurrentUrl(urlOptions:string[]):string[] {
    // truncate the service string back to the last known good entity (could be an id if prev was a collection)
    // concat each urlOption with this prefix
    // return that array
    let graphLinks = constructGraphLinksFromFullPath(AppComponent.explorerValues.endpointUrl);
    let baseUrl = [];
    while(graphLinks.length > 0) {
        let lastSegment = graphLinks.shift();
        baseUrl.push(lastSegment.name);
    }

    let baseUrlFinal = AppComponent.Options.GraphUrl + "/" + AppComponent.explorerValues.selectedVersion;
    
    if (baseUrl.length > 0) {
        baseUrlFinal += "/" + baseUrl.join('/');
    }

    return urlOptions.map((url) => baseUrlFinal + '/' + url);
}

// just return relative URLs
// based on the last node, get the possible URLs
export function getUrlsFromServiceURL(version:string):string[] {
    let graphLinks = constructGraphLinksFromFullPath(AppComponent.explorerValues.endpointUrl);
    if (!graphLinks) {
        return [];
    }
    let entityProperties; // all properties inside entities - property, navigationProperty
    if (graphLinks.length > 0) {
        let lastNode = graphLinks.pop();

        if (lastNode.isACollection) {
            return [];
        }

        let entity = getEntityFromTypeName(lastNode.type, version);
        if (!entity) {
            return [];
        }
        entityProperties = entity.links;
    } else {
        entityProperties = loadEntitySets(version);
    }

    // strip out all tags except navigation properties
    let navProperties = [];
    for (let entity in entityProperties) {
        let entityType = entityProperties[entity];
        if (entityType.tagName as GraphNodeLinkTagName === "NavigationProperty") {
            navProperties.push(entity);
        }
    }

    return combineUrlOptionsWithCurrentUrl(navProperties);
}

export function loadEntitySets(version:string) {
    return graphStructureCache.get(version, "EntitySetData");
}

// EntityType and ComplexType
export function loadEntityTypeData(version:string) {
    return graphStructureCache.get(version, "EntityTypeData");
}