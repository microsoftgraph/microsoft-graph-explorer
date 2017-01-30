'use strict';
function run($scope, url, apiService) {
    $scope.$emit('urlChange', url);
}
function formatXml(xml) {
    var reg = /(>)\s*(<)(\/*)/g;
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
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
        var single = Boolean(ln.match(/<.+\/>/));
        var closing = Boolean(ln.match(/<\/.+>/));
        var opening = Boolean(ln.match(/<[^!].*>/));
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';
        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '\t';
        }
        if (fromTo == 'opening->closing')
            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
        else
            formatted += padding + ln + '\n';
    }
    return formatted;
}
;
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
    var headersArr = [];
    for (var headerName in responseObj) {
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
    apiService.performQuery('GET_BINARY')($scope.text).then(function (result) {
        var blob = new Blob([result.data], { type: "image/jpeg" });
        var imageUrl = window.URL.createObjectURL(blob);
        var imageResultViewer = document.getElementById("img");
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
    }
    else {
        return full;
    }
}
function getEntitySets(metadata) {
    var entitySetsObj = {};
    var entitySetsAndSingletons = $(($.parseHTML(metadata))[1]).find("EntityContainer")[0].children;
    for (var i = 0; i < entitySetsAndSingletons.length; i++) {
        var set = entitySetsAndSingletons[i];
        var entitySetOrSingleton = null;
        if (set.tagName == "ENTITYSET") {
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: true,
                type: set.getAttribute("entitytype"),
                isACollection: true
            };
        }
        else if (set.tagName == "SINGLETON") {
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: false,
                type: set.getAttribute("type"),
                isACollection: false
            };
        }
        else {
            console.error("Found unexpected type in metadata under EntityContainer");
        }
        entitySetsObj[entitySetOrSingleton.name] = entitySetOrSingleton;
    }
    return entitySetsObj;
}
function formatRequestHeaders(headers) {
    var obj = {};
    var parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    for (var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if (match) {
            obj[match[1]] = match[2];
        }
    }
    return obj;
}
function createEntityTypeObject(DOMarray) {
    var entityTypes = {};
    for (var i = 0; i < DOMarray.length; i++) {
        var EntityType = {
            name: DOMarray[i].getAttribute("name"),
            links: {}
        };
        var children = DOMarray[i].children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].attributes.length > 0) {
                var childName = children[j].getAttribute("name");
                var type = children[j].getAttribute("type");
                var urlObject = {
                    isACollection: false,
                    name: childName,
                    isEntitySet: false,
                    type: type
                };
                if (type.indexOf("Collection(") == 0) {
                    urlObject.isACollection = true;
                    urlObject.type = type.split("(")[1].split(")")[0];
                }
                EntityType.links[childName] = urlObject;
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
function myTrim(word) {
    var returnWord = word;
    if (returnWord != null) {
        while (returnWord.charAt(returnWord.length - 1) == "/") {
            returnWord = returnWord.replace(/\/$/, "");
        }
        return returnWord;
    }
}
function getEntityName(URL) {
    var returnWord = myTrim(URL);
    if (returnWord != null) {
        returnWord = returnWord.substring(returnWord.lastIndexOf("/") + 1, returnWord.length);
    }
    return returnWord;
}
function getEntityFromTypeName(service, typePossiblyWithPrefix) {
    var entityTypeData = service.cache.get(service.selectedVersion + "EntityTypeData");
    var type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];
}
function constructGraphLinksFromServicePath(service) {
    var urlPathArr = service.text.split("https://graph.microsoft.com/");
    if (urlPathArr.length <= 1)
        return [];
    var segments = urlPathArr[1].split("/");
    var version = segments.shift();
    var graph = [];
    var entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
    if (entityContainerData === undefined)
        return [];
    while (segments.length > 0) {
        var segment = segments.shift();
        if (graph.length == 0) {
            if (segment in entityContainerData) {
                var node = entityContainerData[segment];
                graph.push(node);
            }
        }
        else {
            var lastGraphItem = graph[graph.length - 1];
            var lastGraphItemEntity = getEntityFromTypeName(service, lastGraphItem.type);
            if (lastGraphItemEntity === undefined) {
                continue;
            }
            if (lastGraphItemEntity.links !== undefined && segment in lastGraphItemEntity.links) {
                graph.push(lastGraphItemEntity.links[segment]);
            }
            else if (lastGraphItem.isACollection && segment != "") {
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
function combineUrlOptionsWithCurrentUrl(service, urlOptions) {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    var baseUrl = [];
    while (graphFromServiceUrl.length > 0) {
        var lastSegment = graphFromServiceUrl.shift();
        baseUrl.push(lastSegment.name);
    }
    var baseUrlFinal = "https://graph.microsoft.com/" + service.selectedVersion;
    if (baseUrl.length > 0) {
        baseUrlFinal += "/" + baseUrl.join('/');
    }
    var autocompleteUrls = [];
    for (var urlAutoCompleteSuffix in urlOptions) {
        autocompleteUrls.push(baseUrlFinal + '/' + urlOptions[urlAutoCompleteSuffix]);
    }
    return autocompleteUrls;
}
function getUrlsFromServiceURL(service, lastCallSuccessful) {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    if (graphFromServiceUrl.length > 0) {
        var lastNode = graphFromServiceUrl.pop();
        if (lastNode.isACollection)
            return [];
        var entity = getEntityFromTypeName(service, lastNode.type);
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entity.links));
    }
    else {
        var entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
        if (entityContainerData === undefined) {
            return [];
        }
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entityContainerData));
    }
}
function showRequestBodyEditor() {
    s.tabConfig.disableRequestBodyEditor = false;
    s.tabConfig.hideContent = false;
    showRequestHeaders(s);
    $(function () {
        initializeJsonEditor(s);
        setSelectedTab(1);
    });
}
function setSelectedTab(num) {
    if (num >= 2 || num < 0) {
        return;
    }
    s.tabConfig.selected = num;
    s.tabConfig.previousSelected = s.tabConfig.selected;
}
function handleQueryString(service, actionValue, versionValue, requestValue) {
    if (actionValue) {
        service.selectedOption = actionValue.toUpperCase();
        if (service.selectedOption === 'POST' || service.selectedOption === 'PATCH') {
            if (hello('msft').getAuthResponse() != null)
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
function getUrlsFromEntityType(service, entity) {
    var entityTypes = service.cache.get(service.selectedVersion + "EntityTypeData");
    var type = entityTypes[entity.name];
    return combineUrlOptionsWithCurrentUrl(service, Object.keys(type.links));
}
function parseMetadata(service, $scope) {
    var entitySetData, entityTypeData;
    if (!service.cache.get(service.selectedVersion + "Metadata")) {
        console.log("parsing metadata");
        service.getMetadata().then(function (results) {
            var metadata = results.data;
            service.cache.put(service.selectedVersion + "Metadata", results);
            entitySetData = getEntitySets(metadata);
            service.cache.put(service.selectedVersion + "EntitySetData", entitySetData);
            entityTypeData = getEntityTypes(metadata);
            service.cache.put(service.selectedVersion + "EntityTypeData", entityTypeData);
            console.log("metadata successfully parsed");
            if (service.entity == "") {
                service.entity = entityTypeData["user"];
            }
            else {
                service.entity = entityTypeData[getEntityName(service.text)];
            }
            $scope.$root.$broadcast("updateUrlOptions");
        }, function (err, status) {
            console.error("metadata could not be parsed");
        });
    }
    else {
        $scope.$root.$broadcast("updateUrlOptions");
    }
}
//# sourceMappingURL=api-explorer-helpers.js.map