var fs = require('fs');

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('sample-queries.csv')
});

let knownHeaders = {
  "Category Name": "category",
  "Type of Query": "method",
  "Query title (max length: 64 chars)": "humanName",
  "Query URL": "requestUrl",
  "Doc Link": "docLink",
  "Post template file name": "postBodyTemplateName"
}

let schema, queries = [];

lineReader.on('line', function (line) {

  if (!schema) {
    schema = {};
    let headers = line.split(",");
    for (let i=0;i<headers.length;i++) {
      schema[headers[i]] = i;
    }
    return;
  }

  let query = createQueryFromLine(line)

  if (query["Query URL"]) // only add queries that have URLs
    queries.push(query);

});

function createQueryFromLine(line) {
  let lineArr = line.split(",");

  var query = {};
  for (let col in schema) {
    if (lineArr[schema[col]]) // don't add empty cells
      query[col] = lineArr[schema[col]];
  }
  return query;
}

function convertRawQueryToSampleQueryType(query) {
  let sampleQuery = {}
  for (let knownHeadersCSVColName in knownHeaders) {
    if (knownHeadersCSVColName in query) {
      sampleQuery[knownHeaders[knownHeadersCSVColName]] = query[knownHeadersCSVColName];
    }
  }
  return sampleQuery;
}

lineReader.on('close', function() {
    saveSampleQueries();
    console.log('end!')
});

function saveSampleQueries() {
let outStr=`
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// WARNING - This file is generated from import-sample-queries.js

import { SampleQuery } from "./base";

export const SampleQueries: SampleQuery[] = [
  `;
  formattedQueryArr = []
  for (let i=0;i<queries.length;i++) {
    let csvQuery = queries[i];
    let sampleQuery = convertRawQueryToSampleQueryType(csvQuery);

    cleanupSampleQuery(sampleQuery);

    formattedQueryArr.push(JSON.stringify(sampleQuery, null, 4));
  }

  outStr += formattedQueryArr.join(",");

  outStr += ']'
  
  fs.writeFile("src/app/gen-queries.ts", outStr, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  }); 
}

function cleanupSampleQuery(sampleQuery) {
  if (sampleQuery.method)
    sampleQuery.method = sampleQuery.method.toUpperCase().trim();

  // remove quotes on URL

  if (sampleQuery.requestUrl && sampleQuery.requestUrl[0] == '"')
    sampleQuery.requestUrl = JSON.parse(sampleQuery.requestUrl)

  if (sampleQuery.docLink && sampleQuery.docLink[0] == '"')
    sampleQuery.docLink = JSON.parse(sampleQuery.docLink)
}