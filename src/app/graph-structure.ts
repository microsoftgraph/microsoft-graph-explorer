// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from './app.component';
import { GraphApiVersion, GraphApiVersions } from './base';
import { GraphService } from './graph-service/graph-service';
export type GraphNodeLinkTagName = 'Property' | 'NavigationProperty' | 'EntitySet' | 'Singleton';

export interface IGraphNodeLink {
    isACollection?: boolean;
    type: string; // Corresponds to a possible name of a Graph Entity
    name: string;
    tagName?: GraphNodeLinkTagName;
}

export interface IGraphEntity {
    name: string;
    links: { [Name: string]: IGraphNodeLink; };
}

export function parseMetadata(apiService: GraphService, version?: GraphApiVersion): Promise<any> {
    /* don't try to download invalid metadata*/
  if (version && GraphApiVersions.indexOf(version) === -1) {
        return Promise.reject(`invalid version: ${version}`);
    }

  return new Promise((resolve, reject) => {
        if (!version) {
            version = AppComponent.explorerValues.selectedVersion;
        }

        if (!graphStructureCache.containsVersion(version)) {
            apiService.getMetadata(AppComponent.Options.GraphUrl, version).then((results: any) => {
                const metadata = $($.parseXML(results._body));

                const entitySetData = getEntitySets(metadata);
                graphStructureCache.add(version, 'EntitySetData', entitySetData);
                const entityTypeData = getEntityTypes(metadata);
                graphStructureCache.add(version, 'EntityTypeData', entityTypeData);
                return resolve();
            }).catch(reject);
        } else {
            // Metadata already cached
            return resolve();
        }
    });
}

class GraphStructureCache {
    public contents: {
        [version: string]: {
            [content: string]: any,
        },
    } = {};

    public add(version: string, key: string, content: any) {
        this.contents[version] = this.contents[version] || {};
        this.contents[version][key] = content;
    }

    public containsVersion(version: string) {
        return version in this.contents;
    }

    public contains(version: string, key: string) {
        return this.contents[version] && this.contents[version][key];
    }

    public get(version: string, key: string) {
        if (this.contains(version, key)) {
            return this.contents[version][key];
        }
    }
}

const graphStructureCache = new GraphStructureCache();

function getEntitySets(metadata: JQuery) {
    const entitySetsObj = {};
    const entitySetsAndSingletons = metadata.find('EntitySet,SingleTon');
    for (let i = 0; i < entitySetsAndSingletons.length; i++) { // tslint:disable-line
        const set = entitySetsAndSingletons[i];

        const entitySetOrSingleton: IGraphNodeLink = {
            name: set.getAttribute('Name'),
            // Singletons like "me" have "Type" instead of "EntityType"
            type: set.getAttribute('EntityType') || set.getAttribute('Type'),
            tagName: set.tagName as GraphNodeLinkTagName,
        };

        if (set.tagName === 'EntitySet') {
            entitySetOrSingleton.isACollection = true;
        } else if (set.tagName === 'Singleton') {
            entitySetOrSingleton.isACollection = false;
        } else {
            throw new Error('Found unexpected type in metadata under EntityContainer');
        }

        entitySetsObj[entitySetOrSingleton.name] = entitySetOrSingleton;
    }
    return entitySetsObj;
}

function createEntityTypeObject(DOMarray: Element[]) {
    const entityTypes = {};
    for (let i = 0; i < DOMarray.length; i++) { // tslint:disable-line
           const EntityType: IGraphEntity = {
                name: DOMarray[i].getAttribute('Name'),
                links: {},
           };

           const children = $(DOMarray[i]).children(); // Must use $() otherwise in IE .children is undefined
           for (let j = 0; j < children.length; j++) { // tslint:disable-line
                if (children[j].attributes.length > 0) {

                    const childName = children[j].getAttribute('Name');
                    const type = children[j].getAttribute('Type');

                    const urlObject: IGraphNodeLink = {
                        isACollection: false,
                        name: childName,
                        type,
                        tagName: children[j].tagName as GraphNodeLinkTagName,
                    };

                    if (type.indexOf('Collection(') === 0) {
                        urlObject.isACollection = true;
                        urlObject.type = type.split('(')[1].split(')')[0]; // Collection("A") => A
                    }

                    EntityType.links[childName] = urlObject;
                }
           }
           entityTypes[EntityType.name] = EntityType;
    }
    return entityTypes;
}

function getEntityTypes(metadata: any) {
    const entities = {};

    const entityTypes = metadata.find('EntityType');
    jQuery.extend(entities, createEntityTypeObject(entityTypes));

    const complexTypes = metadata.find('ComplexType');
    jQuery.extend(entities, createEntityTypeObject(complexTypes));

    return entities;
}

export function getEntityFromTypeName(typePossiblyWithPrefix: string, version: string): IGraphEntity {
    const entityTypeData = loadEntityTypeData(version);
    if (!entityTypeData) {
        return null;
    }
    const type = typePossiblyWithPrefix.split('microsoft.graph.').pop();
    return entityTypeData[type];
}

export function constructGraphLinksFromFullPath(path: string): IGraphNodeLink[] {

    const parser = document.createElement('a');
    parser.href = path;

    const urlPathArr = parser.pathname;

    if (!urlPathArr) {
        return [];
    }

    const segments: string[] = urlPathArr.split('/');

    if (segments.length <= 2) {
        return [];
    }

    segments.shift(); // Remove leading slash
    const version = segments.shift();

    // Singletons and entitysets
    const entityContainerData = loadEntitySets(version);

    if (!entityContainerData) {
        return [];
    }
    const graph: IGraphNodeLink[] = [];
    while (segments.length > 0) {
        const segment = segments.shift();
        if (graph.length === 0) {
            if (segment in entityContainerData) {
                const node: IGraphNodeLink = entityContainerData[segment];
                graph.push(node);
            }
        } else {
            const lastGraphItem = graph[graph.length - 1];
            const lastGraphItemEntity = getEntityFromTypeName(lastGraphItem.type, version);

            if (lastGraphItemEntity === undefined) {
                continue;
            }

            if (lastGraphItemEntity.links !== undefined && segment in lastGraphItemEntity.links) {
                graph.push(lastGraphItemEntity.links[segment]);
            } else if (lastGraphItem.isACollection && segment !== '') {
                // Previous link was a collection, current is an id
                graph.push({
                    isACollection: false,
                    name: segment,
                    type: lastGraphItem.type,
                });
            }
        }
    }
    return graph;
}

function combineUrlOptionsWithCurrentUrl(urlOptions: string[]): string[] {
    /*
     truncate the service string back to the last known good entity (could be an id if prev was a collection)
     concat each urlOption with this prefix
     return that array
    */
    const graphLinks = constructGraphLinksFromFullPath(AppComponent.explorerValues.endpointUrl);
    const baseUrl = [];
    while (graphLinks.length > 0) {
        const lastSegment = graphLinks.shift();
        baseUrl.push(lastSegment.name);
    }

    let baseUrlFinal = AppComponent.Options.GraphUrl + '/' + AppComponent.explorerValues.selectedVersion;

    if (baseUrl.length > 0) {
        baseUrlFinal += '/' + baseUrl.join('/');
    }

    return urlOptions.map((url) => baseUrlFinal + '/' + url);
}

// Just return relative URLs
// Based on the last node, get the possible URLs
export function getUrlsFromServiceURL(version: string): string[] {
    const graphLinks = constructGraphLinksFromFullPath(AppComponent.explorerValues.endpointUrl);
    if (!graphLinks) {
        return [];
    }
    let entityProperties; // All properties inside entities - property, navigationProperty
    if (graphLinks.length > 0) {
        const lastNode = graphLinks.pop();

        if (lastNode.isACollection) {
            return [];
        }

        const entity = getEntityFromTypeName(lastNode.type, version);
        if (!entity) {
            return [];
        }
        entityProperties = entity.links;
    } else {
        entityProperties = loadEntitySets(version);
    }

    // Strip out all tags except navigation properties
    const navProperties = [];
    for (const entity in entityProperties) { // tslint:disable
        const entityType = entityProperties[entity];
        if (entityType.tagName as GraphNodeLinkTagName === 'NavigationProperty') {
            navProperties.push(entity);
        }
    }

    return combineUrlOptionsWithCurrentUrl(navProperties);
}

export function loadEntitySets(version: string) {
    return graphStructureCache.get(version, 'EntitySetData');
}

// EntityType and ComplexType
export function loadEntityTypeData(version: string) {
    return graphStructureCache.get(version, 'EntityTypeData');
}
