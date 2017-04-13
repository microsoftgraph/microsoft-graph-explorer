// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from "./app.component";
import { GraphService } from "./api-explorer-svc";
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

export function parseMetadata(apiService:GraphService, version?:string):Promise<any> {
    // don't try to download invalid metadata
    if (version && AppComponent.Options.GraphVersions.indexOf(version) == -1) {
        return Promise.reject(`invalid version: ${version}`);
    }

    return new Promise((resolve, reject) => {
        if (!version) {
            version = AppComponent.explorerValues.selectedVersion;
        }

        if (!graphStructureCache.containsVersion(version)) {
            console.log(`parsing ${version} metadata`);
            apiService.getMetadata(version).then((results:any) => {
                const metadata = $($.parseXML(results.data));

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
        if (this.contains(version, key))
            return this.contents[version][key];
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

        if (set.tagName == "EntitySet") {
            entitySetOrSingleton.isACollection = true;
        } else if (set.tagName == "Singleton") { 
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

                    if (type.indexOf("Collection(") == 0) {
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
    let type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];
}

export function constructGraphLinksFromFullPath(service:GraphService, path:string):Promise<GraphNodeLink[]> {
    const urlPathArr = path.split(AppComponent.Options.GraphUrl+"/");
    if (urlPathArr.length <=1)
        return Promise.resolve([]);

    let segments:string[] = urlPathArr[1].split("/");
    let version = segments.shift();

    // singletons and entitysets
    return loadEntitySets(service, version).then((entityContainerData) => {
        var graph:GraphNodeLink[] = [];
        while (segments.length > 0) {
            let segment = segments.shift();
            if (graph.length == 0) {
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
                } else if (lastGraphItem.isACollection && segment != "") {
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
    }).catch(() => {
        return [];
    });
}

// urlOptions are like ["driveType", "quota"]
function combineUrlOptionsWithCurrentUrl(service:GraphService, urlOptions:string[]):Promise<string[]> {
    // truncate the service string back to the last known good entity (could be an id if prev was a collection)
    // concat each urlOption with this prefix
    // return that array
    return constructGraphLinksFromFullPath(service, AppComponent.explorerValues.endpointUrl).then((graphLinks) => {
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
    });
}

// just return relative URLs
export function getUrlsFromServiceURL(service:GraphService, version:string):Promise<string[]> {
    return new Promise((resolve, reject) => {
        return constructGraphLinksFromFullPath(service, AppComponent.explorerValues.endpointUrl).then((graphFromServiceUrl) => {
            if (graphFromServiceUrl.length > 0) {
                let lastNode = graphFromServiceUrl.pop();

                if (lastNode.isACollection) return resolve([]);

                let entity = getEntityFromTypeName(lastNode.type, version);
                if (!entity) return resolve([]);
                return resolve((entity.links));
            } else {
                return resolve(loadEntitySets(service, version));
            }
        });
    }).then((x) => {
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(x));
    });
}

export function loadEntitySets(service:GraphService, version:string):Promise<any> {
    return parseMetadata(service, version).then(() => {
        return graphStructureCache.get(version, "EntitySetData");
    })
}

// EntityType and ComplexType
// @todo use promises
export function loadEntityTypeData(version:string) {
    return graphStructureCache.get(version, "EntityTypeData");
}