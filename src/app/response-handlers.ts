// // ------------------------------------------------------------------------------
// //  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// // ------------------------------------------------------------------------------
// import {apiService} from "./api-explorer-svc"
import { getJsonViewer } from "./api-explorer-jseditor"
import { GraphService } from "./api-explorer-svc";
import { AppComponent } from "./app.component";
import { isAuthenticated } from "./auth";

export function showResults(results, headers:Headers, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer(headers);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}

export function insertHeadersIntoResponseViewer(headers:Headers) {
    // format headers
    let headersArr = [];
    debugger;
    headers.forEach((headerValue, headerKey) => {
        headersArr.push(headerKey + ": " + headerValue);
    })
    
    getJsonViewer().getSession().setValue("");
    getJsonViewer().getSession().insert(0, headersArr.join("\n"));
}

export function handleImageResponse(method:any, headers, status, handleUnsuccessfulQueryResponse) {
    method('GET_BINARY', AppComponent.explorerValues.endpointUrl).then((result) => {
        let blob = new Blob( [ result.arrayBuffer() ], { type: "image/jpeg" } );
        let imageUrl = window.URL.createObjectURL( blob );

        const imageResultViewer = <HTMLImageElement>document.getElementById("responseImg");
        imageResultViewer.src = imageUrl;
        AppComponent.explorerValues.showImage = true;

        insertHeadersIntoResponseViewer(result.headers);
    }, handleUnsuccessfulQueryResponse);
}

export function handleHtmlResponse(results, headers:Headers) {
    showResults(results, headers, "html");
}

export function handleJsonResponse(results, headers:Headers) {
    results = JSON.stringify(results, null, 4);
    showResults(results, headers, "json");
}

export function handleXmlResponse(results, headers) {
    results = formatXml(results);
    showResults(results, headers, "xml");
}

export function isImageResponse(headers:Headers) {
    var contentType = getContentType(headers);
    return contentType === "application/octet-stream" || contentType.substr(0, 6) === "image/";
}

export function isHtmlResponse(headers:Headers) {
    var contentType = getContentType(headers);
    return contentType === "text/html" || contentType === "application/xhtml+xml";
}

export function isXmlResponse(results) {
    // Don't use headers since xml could be of a million content types.
    return JSON.stringify(results, null, 4).indexOf("<?xml") != -1;
}

export function isJsonResponse(headers:Headers) {
    var contentType = getContentType(headers);
    return contentType === "application/json";
}

export function getContentType(headers:Headers) {
    var full = headers.get("content-type");
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