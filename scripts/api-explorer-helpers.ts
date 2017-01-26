// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

declare const ace:any;
declare const $:any;

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

function showDuration($scope, startTime) {
    var endTime = new Date();
    $scope.duration = (endTime.getTime() - startTime.getTime());
    $scope.requestInProgress = false;
}



function insertHeadersIntoResponseViewer($scope, headers, status) {
   var responseObj = {};
    if (headers != null) {
        responseObj = headers();
    }
    
    responseObj["Status Code"] = status;

    // format headers
    var headersArr = [];
    for(var headerName in responseObj) {
        headersArr.push(headerName + ": " + responseObj[headerName]);
    }
    
    getJsonViewer().getSession().setValue("");
    getJsonViewer().getSession().insert(0, headersArr.join("\n"));
}
function getRequestBodyEditor() {
    var requestBodyEditorElement = document.getElementById("jsonEditor");
    return ace.edit(requestBodyEditorElement);
}

function getJsonViewer() {
    var jsonViewerElement = document.getElementById("jsonViewer");
    return ace.edit(jsonViewerElement);
}

function showResults($scope, results, headers, status, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer($scope, headers, status);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}

function handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.text).then(function(result) {
        var blob = new Blob( [ result.data ], { type: "image/jpeg" } );
        var imageUrl = window.URL.createObjectURL( blob );

        const imageResultViewer = <HTMLImageElement>document.getElementById("img");
        imageResultViewer.src = imageUrl;
        $scope.showImage = true;
        insertHeadersIntoResponseViewer($scope, result.headers, result.status);
        showDuration($scope, startTime);
    }, handleUnsuccessfulQueryResponse);
}

function handleHtmlResponse($scope, startTime, results, headers, status) {
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "html");
}

function handleJsonResponse($scope, startTime, results, headers, status) {
    results = JSON.stringify(results, null, 4);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "json");
}

function handleXmlResponse($scope, startTime, results, headers, status) {
    results = formatXml(results);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "xml");
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

// entitysets in EntityContainer
// entitytypes
interface GraphEntity {
    name: string
    isEntitySet: boolean
    URLS: string[]
    entityType: string
}

function getEntitySets(metadata) {
    var entitySetsObj = {};
    var entitySets = $(($.parseHTML(metadata))[1]).find("EntityContainer")[0].children;
    for(var i=0; i<entitySets.length; i++){
        var set = entitySets[i];

        var EntitySet:GraphEntity = {
            name: set.getAttribute("name"),
            isEntitySet: true,
            URLS: [],
            entityType: set.getAttribute("entitytype")
        };

        entitySetsObj[EntitySet.name] = EntitySet;
    }
    return entitySetsObj;
}

function formatRequestHeaders(headers){
    var obj = {};
    var parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    
    for(var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if(match) {
            obj[match[1]] = match[2];
        }
    }
    
   return obj; 
}

function createEntityTypeObject (DOMarray) {
    var entityTypes = {}
    for(var i=0; i<DOMarray.length; i++){
           var EntityType:GraphEntity = {
                name: DOMarray[i].getAttribute("name"),
                isEntitySet: false
                URLS: []
           };

           var children = DOMarray[i].children;
           for(var j=0; j<children.length; j++) {
                 if(children[j].attributes.length > 0) {
                     var urlObject = {
                         isACollection: false
                     };
                     var childName = children[j].getAttribute("name");
                     var type = children[j].getAttribute("type");
                     if(type.indexOf("Collection(") == 0) {
                         urlObject.isACollection = true;
                         type = type.split("(")[1].split(")")[0]; // Collection("A") => A
                     }
                     urlObject.name = childName;
                     urlObject.type = type;
                     EntityType.URLS.push(urlObject);
                 }
           }
           entityTypes[EntityType.name] = EntityType;
    }    
    return entityTypes;
}

function showRequestHeaders($scope) {
    if (!$scope.jsonEditorHeaders)
        return;
    $scope.jsonEditorHeaders.getSession().setValue("");
    var requestHeaders = "Content-Type: application/json";
    $scope.jsonEditorHeaders.getSession().insert(0, requestHeaders);
}

function getEntityTypes(metadata) {
    var entities = {};

    var entityTypes = $(($.parseHTML(metadata))[1]).find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));
    
    var complexTypes = $(($.parseHTML(metadata))[1]).find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));
    
    return entities;
}

function myTrim (word){
      var returnWord = word;
      if(returnWord != null){
          while(returnWord.charAt(returnWord.length-1) == "/" ){
              returnWord = returnWord.replace(/\/$/, "");
          }
          return returnWord; 
      }
} 

function getEntityName (URL){
     var returnWord = myTrim(URL);
     if(returnWord != null){
         returnWord = returnWord.substring(returnWord.lastIndexOf("/")+1, returnWord.length);
     }
     return returnWord;
}


function getPreviousCall (URL, entityName){
    var index = URL.indexOf(entityName);
    return URL.substr(0, index-1);
}


function setEntity (entityItem, service, lastCallSuccessful) {
    
   if (getEntityName(service.text) == service.selectedVersion) {
             var entityObj = {};
             entityObj.name = service.selectedVersion;
             service.entity = entityObj; 
             return;
    } else {
       var entityName = getEntityName(service.text);
    }
    
    var prevCallName = getEntityName(getPreviousCall(service.text, entityName));
    var twoPrevCallsName = getEntityName(getPreviousCall(getPreviousCall(service.text, entityName), prevCallName));
    if (entityName === "me" && lastCallSuccessful) {
        prevCallName = "users";
    } else if (twoPrevCallsName === "me" && lastCallSuccessful) {
        twoPrevCallsName = "user";
    }
    
    var entitySet = service.cache.get(service.selectedVersion + "EntitySetData")[prevCallName];
    var entityType = service.cache.get(service.selectedVersion + "EntityTypeData")[prevCallName]; 
    var twoPrevEntityType = service.cache.get(service.selectedVersion + "EntityTypeData")[twoPrevCallsName];
    var twoPrevEntitySet = service.cache.get(service.selectedVersion + "EntitySetData")[twoPrevCallsName];
    var collection = false;
    if (twoPrevEntitySet) {
        for(var i=0; i<twoPrevEntitySet.URLS.length; i++){
            if(twoPrevEntitySet.URLS[i].name == prevCallName){
                collection = twoPrevEntitySet.URLS[i].isACollection;
            }
        }
    } else if (twoPrevEntityType) {
        for(var i=0; i<twoPrevEntityType.URLS.length; i++){
            if(twoPrevEntityType.URLS[i].name == prevCallName){
                collection = twoPrevEntityType.URLS[i].isACollection;
                var collectionType = twoPrevEntityType.URLS[i].type;
                break;
            }
        }
    }
    
    service.entityNameIsAnId =
        (((entitySet && !entityType) || (entitySet && twoPrevCallsName === service.selectedVersion))
        && lastCallSuccessful && (prevCallName != "me"))
        || (collection && lastCallSuccessful);
    
    if (service.entityNameIsAnId) {
        //$log.log("entity name is an id");
        var typeName;
        if (collection) {
            //$log.log("is a collection");
            typeName = collectionType;
            //$log.log(typeName);
        } else if (entitySet) {
            typeName = entitySet.entityType;
        }

        service.entity = service.cache.get(service.selectedVersion + "EntityTypeData")[typeName];
    }
    else {
        if (!entityType && entitySet) {
            entityType = setToSetOrType(service, entitySet.entityType);
        }

        if (entityType) {
            
            // IE claims array.find code below has syntax error, probably due to lack of support.
            // var matchingElement = entityType.URLS.find(u => u.name === entityName && !u.isACollection);
            var matchingElement = null;
            for (var i = 0; i < entityType.URLS.length; i++) {
                if (entityType.URLS[i].name == entityName && !entityType.URLS[i].isACollection) {
                    matchingElement = entityType.URLS[i];
                    break;
                }
            }

            if (matchingElement) {
                service.entity = setToSetOrType(service, matchingElement.type);
            }
            else {
                service.entity = null;
            }
        } else {
            service.entity = setToSetOrType(service, entityName, prevCallName);
        }
    }
}

function setToSetOrType (service, entityName, prevCallName) {
    var isEntitySet = service.cache.get(service.selectedVersion + "EntitySetData")[entityName];
    var isEntityType = service.cache.get(service.selectedVersion + "EntityTypeData")[entityName];
    if (isEntitySet && !isEntityType) {
        return isEntitySet;
    } else if(isEntityType && !isEntitySet) {
        return isEntityType;
    } else if(isEntitySet && isEntityType) {
        if (prevCallName === service.selectedVersion) {
            return isEntitySet
        } else {
            return isEntityType;
        }
    }
}

function showRequestBodyEditor () {
    s.tabConfig.disableRequestBodyEditor = false;
    s.tabConfig.hideContent = false;
    showRequestHeaders(s);
    $(function() {
        initializeJsonEditor(s);
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
            if(service.entity == ""){
                service.entity = entityTypeData["user"];
            }else{
                service.entity = entityTypeData[getEntityName(service.text)];
            }
                
          $scope.$root.$broadcast("updateUrlOptions");
         }, function(err, status){
            console.error("metadata could not be parsed");
         });
     } else {
          $scope.$root.$broadcast("updateUrlOptions");
     }
}