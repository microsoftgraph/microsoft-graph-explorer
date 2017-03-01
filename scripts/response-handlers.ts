// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------
import {apiService} from "./api-explorer-svc"
import {getJsonViewer} from "./api-explorer-jseditor"

export function showResults(results, headers, status, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer(headers, status);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}

export function insertHeadersIntoResponseViewer(headers, status) {
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

export function handleImageResponse($scope, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.getSearchText()).then((result) => {
        let blob = new Blob( [ result.data ], { type: "image/jpeg" } );
        let imageUrl = window.URL.createObjectURL( blob );

        const imageResultViewer = <HTMLImageElement>document.getElementById("img");
        imageResultViewer.src = imageUrl;
        $scope.showImage = true;
        insertHeadersIntoResponseViewer(result.headers, result.status);
        $scope.requestInProgress = false;
    }, handleUnsuccessfulQueryResponse);
}

export function handleHtmlResponse($scope, startTime, results, headers, status) {
    $scope.requestInProgress = false;
    showResults(results, headers, status, "html");
}

export function handleJsonResponse($scope, startTime, results, headers, status) {
    results = JSON.stringify(results, null, 4);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "json");
}

export function handleXmlResponse($scope, startTime, results, headers, status) {
    results = formatXml(results);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "xml");
}

export function isImageResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/octet-stream" || contentType.substr(0, 6) === "image/";
}

export function isHtmlResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "text/html" || contentType === "application/xhtml+xml";
}

export function isXmlResponse(results) {
    // Don't use headers since xml could be of a million content types.
    return JSON.stringify(results, null, 4).indexOf("<?xml") != -1;
}

export function isJsonResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/json";
}

export function getContentType(headers) {
    var full = headers("content-type");
    var delimiterPos = full.indexOf(";");
    if (delimiterPos != -1) {
        return full.substr(0, delimiterPos);
    } else {
        return full;
    }
}


export function formatXml(xml) {
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