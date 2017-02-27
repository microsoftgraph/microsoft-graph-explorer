// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

declare const ace:any;
declare const hello:any;

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

function handleImageResponse($scope, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.getSearchText()).then(function(result) {
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

type GraphNodeLinkTagName = "Property" | "NavigationProperty" | "EntitySet" | "Singleton"

interface GraphNodeLink {
    isACollection?: boolean
    type: string // corresponds to a possible name of a Graph Entity
    name: string,
    tagName?: GraphNodeLinkTagName
}

interface GraphEntity {
    name: string
    links: { [Name: string] : GraphNodeLink; };
}

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

function formatRequestHeaders(headers) {
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

function showRequestHeaders() {
    getHeadersEditor().getSession().setValue("");
    var requestHeaders = "Content-Type: application/json";
    getHeadersEditor().getSession().insert(0, requestHeaders);
}

function getEntityTypes(metadata) {
    let entities = {};

    let entityTypes = metadata.find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));
    
    let complexTypes = metadata.find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));
    
    return entities;
}

function getEntityFromTypeName(typePossiblyWithPrefix:string):GraphEntity {
    const entityTypeData = apiService.cache.get(apiService.selectedVersion + "EntityTypeData");
    let type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];
}

function constructGraphLinksFromFullPath(path:string):Promise<GraphNodeLink[]> {
    const urlPathArr = path.split(GraphExplorerOptions.GraphUrl+"/");
    if (urlPathArr.length <=1)
        return Promise.resolve([]);

    let segments:string[] = urlPathArr[1].split("/");
    let version = segments.shift();

    // singletons and entitysets
    return loadEntitySets().then((entityContainerData) => {
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
                let lastGraphItemEntity = getEntityFromTypeName(lastGraphItem.type);

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
function combineUrlOptionsWithCurrentUrl(urlOptions:string[]):Promise<string[]> {
    // truncate the service string back to the last known good entity (could be an id if prev was a collection)
    // concat each urlOption with this prefix
    // return that array
    return constructGraphLinksFromFullPath(apiService.text).then((graphLinks) => {
        let baseUrl = [];
        while(graphLinks.length > 0) {
            let lastSegment = graphLinks.shift();
            baseUrl.push(lastSegment.name);
        }

        let baseUrlFinal = GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion;
        
        if (baseUrl.length > 0) {
            baseUrlFinal += "/" + baseUrl.join('/');
        }

        return urlOptions.map((url) => baseUrlFinal + '/' + url);
    });
}

// just return relative URLs
function getUrlsFromServiceURL():Promise<string[]> {
    return new Promise((resolve, reject) => {
        return constructGraphLinksFromFullPath(apiService.text).then((graphFromServiceUrl) => {
            if (graphFromServiceUrl.length > 0) {
                let lastNode = graphFromServiceUrl.pop();

                if (lastNode.isACollection) return resolve([]);

                let entity = getEntityFromTypeName(lastNode.type);
                if (!entity) return resolve([]);
                return resolve((entity.links));
            } else {
                return resolve(loadEntitySets());
            }
        });
    }).then((x) => {
        return combineUrlOptionsWithCurrentUrl(Object.keys(x));
    });
}

function showRequestBodyEditor() {
    tabConfig.disableRequestBodyEditor = false;
    tabConfig.hideContent = false;
    showRequestHeaders();
    $(() => {
        const editor = getRequestBodyEditor();
        initializeAceEditor(editor);
        editor.getSession().setMode("ace/mode/javascript");
        setSelectedTab(1);
    })
}

function setSelectedTab (num) {
    if (num >= 2 || num < 0) {
        return;
    }
    tabConfig.selected = num;
    tabConfig.previousSelected = tabConfig.selected;
}

function handleQueryString(actionValue, versionValue, requestValue) {
    if(actionValue){
        apiService.selectedOption = actionValue.toUpperCase();
        if(apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH') {
            if(hello('msft').getAuthResponse() != null)
                showRequestBodyEditor();
        }
   }
        
   if (versionValue) {
        apiService.selectedVersion = versionValue;
   }
   if (requestValue) {
        apiService.text = GraphExplorerOptions.GraphUrl + "/" + apiService.selectedVersion + "/" + requestValue;
   }
}

function parseMetadata(version?:string):Promise<any> {
    return new Promise((resolve, reject) => {
        if (!version) {
            version = apiService.selectedVersion;
        }

        if(!apiService.cache.get(version + "Metadata")) {
            console.log(`parsing ${version} metadata`);
            return apiService.getMetadata().then((results) => {
                const metadata = $($.parseXML(results.data));

                apiService.cache.put(version + "Metadata", results);
                let entitySetData = getEntitySets(metadata);
                apiService.cache.put(version + "EntitySetData", entitySetData);
                let entityTypeData = getEntityTypes(metadata);
                apiService.cache.put(version + "EntityTypeData", entityTypeData);
                console.log(`${version} metadata successfully parsed`);
            });
        } else {
            // metadata already cached
            resolve();
        }
    });
}

function loadEntitySets():Promise<any> {
    return parseMetadata().then(() => {
        let entitySetData = apiService.cache.get(apiService.selectedVersion + "EntitySetData");
        if (entitySetData === undefined) {
            return Promise.reject(null);
        }
        return Promise.resolve(entitySetData);
    })
}