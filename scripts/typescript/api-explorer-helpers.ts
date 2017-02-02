// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

declare const ace:any;
declare const jQuery:any;
declare const $:any;
declare const hello:any;

function run ($scope, url, apiService) {
    $scope.$emit('urlChange', url);
}

function formatXml(xml) {
    var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
    var transitions = {
        'single->single': 0,
        'single->closing': -1,
        'single->opening': 0,
        'single->other': 0,
        'closing->single': 0,
        'closing->closing': -1,
        'closing->opening': 0,
        'closing->other': 0,
        'opening->single': 1,
        'opening->closing': 0,
        'opening->opening': 1,
        'opening->other': 1,
        'other->single': 0,
        'other->closing': -1,
        'other->opening': 0,
        'other->other': 0
    };

    for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];
        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';

        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '\t';
        }
        if (fromTo == 'opening->closing')
            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
        else
            formatted += padding + ln + '\n';
    }

    return formatted;
};

function insertHeadersIntoResponseViewer(headers, status) {
    let responseObj = {};
    if (headers != null) {
        responseObj = headers();
    }

    responseObj["Status Code"] = status;

    // format headers
    let headersArr = [];
    for(let headerName in responseObj) {
        headersArr.push(headerName + ": " + responseObj[headerName]);
    }
    
    getJsonViewer().getSession().setValue("");
    getJsonViewer().getSession().insert(0, headersArr.join("\n"));
}

function showResults(results, headers, status, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer(headers, status);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}

function handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.text).then(function(result) {
        let blob = new Blob( [ result.data ], { type: "image/jpeg" } );
        let imageUrl = window.URL.createObjectURL( blob );

        const imageResultViewer = <HTMLImageElement>document.getElementById("img");
        imageResultViewer.src = imageUrl;
        $scope.showImage = true;
        insertHeadersIntoResponseViewer(result.headers, result.status);
        $scope.requestInProgress = false;
    }, handleUnsuccessfulQueryResponse);
}

function handleHtmlResponse($scope, startTime, results, headers, status) {
    $scope.requestInProgress = false;
    showResults(results, headers, status, "html");
}

function handleJsonResponse($scope, startTime, results, headers, status) {
    results = JSON.stringify(results, null, 4);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "json");
}

function handleXmlResponse($scope, startTime, results, headers, status) {
    results = formatXml(results);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "xml");
}

function isImageResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/octet-stream" || contentType.substr(0, 6) === "image/";
}

function isHtmlResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "text/html" || contentType === "application/xhtml+xml";
}

function isXmlResponse(results) {
    // Don't use headers, cos xml could be of a million content types.
    return JSON.stringify(results, null, 4).indexOf("<?xml") != -1;
}

function isJsonResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/json";
}

function getContentType(headers) {
    var full = headers("content-type");
    var delimiterPos = full.indexOf(";");
    if (delimiterPos != -1) {
        return full.substr(0, delimiterPos);
    } else {
        return full;
    }
}

// let Graph: { [EntityName: string] : GraphNodeLink; } = {};

interface GraphNodeLink {
    isACollection: boolean
    isEntitySet: boolean
    type: string // corresponds to a possible name of a Graph Entity
    name: string
}

// entitysets in EntityContainer
// entitytypes
interface GraphEntity {
    name: string
    //URLS: string[] // can be generated now
    links: { [Name: string] : GraphNodeLink; };
}

function getEntitySets(metadata) {
    let entitySetsObj = {};
    let entitySetsAndSingletons = $(($.parseHTML(metadata))[1]).find("EntityContainer")[0].children;
    for(var i=0; i<entitySetsAndSingletons.length; i++){
        var set = entitySetsAndSingletons[i];
        
        var entitySetOrSingleton:GraphNodeLink = null;

        if (set.tagName == "ENTITYSET") {
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: true,
                type: set.getAttribute("entitytype"),
                isACollection: true
            };
        } else if (set.tagName == "SINGLETON") { 
        // singletons like "me" have "Type" instead of "EntityType"
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: false,
                type: set.getAttribute("type"),
                isACollection: false
            };
        } else {
            console.error("Found unexpected type in metadata under EntityContainer")
        }

        entitySetsObj[entitySetOrSingleton.name] = entitySetOrSingleton;
    }
    return entitySetsObj;
}

function formatRequestHeaders(headers){
    let obj = {};
    let parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    
    for(var i = 0, len = parts.length; i < len; i++) {
        let match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if(match) {
            obj[match[1]] = match[2];
        }
    }
    
   return obj; 
}

function createEntityTypeObject (DOMarray) {
    let entityTypes = {}
    for(let i=0; i<DOMarray.length; i++){
           let EntityType:GraphEntity = {
                name: DOMarray[i].getAttribute("name"),
                links: {}
           };

           const children = DOMarray[i].children;
           for (var j=0; j<children.length; j++) {
                if (children[j].attributes.length > 0) {

                    let childName = children[j].getAttribute("name");
                    let type = children[j].getAttribute("type");


                    let urlObject:GraphNodeLink = {
                        isACollection: false,
                        name: childName,
                        isEntitySet: false,
                        type: type
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

function showRequestHeaders($scope) {
    getHeadersEditor().getSession().setValue("");
    var requestHeaders = "Content-Type: application/json";
    getHeadersEditor().getSession().insert(0, requestHeaders);
}

function getEntityTypes(metadata) {
    var entities = {};

    var entityTypes = $(($.parseHTML(metadata))[1]).find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));
    
    var complexTypes = $(($.parseHTML(metadata))[1]).find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));
    
    return entities;
}



function getEntityFromTypeName(service, typePossiblyWithPrefix:string):GraphEntity {
    const entityTypeData = service.cache.get(service.selectedVersion + "EntityTypeData");
    let type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];

}

function constructGraphLinksFromServicePath(service):GraphNodeLink[] {
    const urlPathArr = service.text.split("https://graph.microsoft.com/");
    if (urlPathArr.length <=1)
        return [];

    let segments:string[] = urlPathArr[1].split("/");
    let version = segments.shift();

    var graph:GraphNodeLink[] = [];

    // singletons and entitysets
    let entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
    if (entityContainerData === undefined) return [];
    while (segments.length > 0) {
        let segment = segments.shift();
        if (graph.length == 0) {
            if (segment in entityContainerData) {
                let node:GraphNodeLink = entityContainerData[segment];
                graph.push(node);
            }
        } else {
            let lastGraphItem = graph[graph.length - 1];
            let lastGraphItemEntity = getEntityFromTypeName(service, lastGraphItem.type);

            if (lastGraphItemEntity === undefined) {
                continue;
            }

            if (lastGraphItemEntity.links !== undefined && segment in lastGraphItemEntity.links) { // me/drive/root
                graph.push(lastGraphItemEntity.links[segment]);
            } else if (lastGraphItem.isACollection && segment != "") {
                // previous link was a collection, current is an id
                graph.push({
                    isACollection: false,
                    isEntitySet: false,
                    name: segment,
                    type: lastGraphItem.type
                });
            }
        }
    }
    return graph;
}

// urlOptions are like ["driveType", "quota"]
function combineUrlOptionsWithCurrentUrl(service, urlOptions:string[]):string[] {
    // truncate the service string back to the last known good entity (could be an id if prev was a collection)
    // concat each urlOption with this prefix
    // return that array
    
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);


    let baseUrl = [];
    while(graphFromServiceUrl.length > 0) {
        let lastSegment = graphFromServiceUrl.shift();
        baseUrl.push(lastSegment.name);
    }

    let baseUrlFinal = "https://graph.microsoft.com/"+service.selectedVersion;
    
    if (baseUrl.length > 0) {
        baseUrlFinal += "/" + baseUrl.join('/');
    }

    let autocompleteUrls = [];
    for (let urlAutoCompleteSuffix in urlOptions) {
        autocompleteUrls.push(baseUrlFinal + '/' + urlOptions[urlAutoCompleteSuffix]);
    }
    return autocompleteUrls;

}

// just return relative URLs
function getUrlsFromServiceURL (service):string[] {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    if (graphFromServiceUrl.length > 0) {
        let lastNode = graphFromServiceUrl.pop();

        if (lastNode.isACollection) return [];

        let entity = getEntityFromTypeName(service, lastNode.type);
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entity.links));
    } else {
        let entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
        if (entityContainerData === undefined) {
            return [];
        }
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entityContainerData));
    }
}

function showRequestBodyEditor () {
    s.tabConfig.disableRequestBodyEditor = false;
    s.tabConfig.hideContent = false;
    showRequestHeaders(s);
    $(function() {
        initializeJsonEditor();
        setSelectedTab(1);
    })
}

function setSelectedTab (num) {
    if (num >= 2 || num < 0) {
        return;
    }
    s.tabConfig.selected = num;
    s.tabConfig.previousSelected = s.tabConfig.selected;
}

function handleQueryString (service, actionValue, versionValue, requestValue) {
    if(actionValue){
        service.selectedOption = actionValue.toUpperCase();
        if(service.selectedOption === 'POST' || service.selectedOption === 'PATCH') {
            if(hello('msft').getAuthResponse() != null)
                showRequestBodyEditor();
        }
   }
        
   if (versionValue) {
        service.selectedVersion = versionValue;
   }
   if (requestValue) {
        service.text = "https://graph.microsoft.com/" + service.selectedVersion + "/" + requestValue;
   }
}

function getUrlsFromEntityType(service:any, entity:GraphEntity):string[] {
    const entityTypes: { [Name: string] : GraphEntity; }
                    = service.cache.get(service.selectedVersion + "EntityTypeData");

    var type:GraphEntity = entityTypes[entity.name];
    return combineUrlOptionsWithCurrentUrl(service, Object.keys(type.links));
}

function parseMetadata (service, $scope) {
    var entitySetData, entityTypeData;
    if(!service.cache.get(service.selectedVersion + "Metadata")) {
        console.log("parsing metadata");
        service.getMetadata().then(function(results) {
            var metadata = results.data;
            service.cache.put(service.selectedVersion + "Metadata", results);
            entitySetData = getEntitySets(metadata);
            service.cache.put(service.selectedVersion + "EntitySetData", entitySetData);
            entityTypeData = getEntityTypes(metadata);
            service.cache.put(service.selectedVersion + "EntityTypeData", entityTypeData);
            console.log("metadata successfully parsed");
                
          $scope.$root.$broadcast("updateUrlOptions");
         }, function(err, status){
            console.error("metadata could not be parsed");
         });
     } else {
          $scope.$root.$broadcast("updateUrlOptions");
     }
}