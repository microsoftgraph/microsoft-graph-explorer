let fs = require('fs');
var csv = require("fast-csv");

let stream = fs.createReadStream('sample-queries.csv')

let knownHeaders = {
  "Category Name": "category",
  "Type of Query": "method",
  "Query title (max length: 64 chars)": "humanName",
  "Query URL": "requestUrl",
  "Doc Link": "docLink",
  "Post template name": "postBodyTemplateName",
  "Headers": 'headers',
  "Post template": 'postBody',
  "Tip (something we'll expose in the UI when a user makes a particular request)": "tip"
}

let schema, queries = [];

var csvStream = csv()
  .on("data", (line) => {

    if (!schema) {
      schema = {};
      let headers = line;
      for (let i = 0; i < headers.length; i++) {
        schema[headers[i]] = i;
      }
      return;
    }

    let query = createQueryFromLine(line)

    if (query["Query URL"]) // only add queries that have URLs
      queries.push(query);
  })
  .on("end", function () {
    saveSampleQueries();
  });

function createQueryFromLine(lineArr) {

  var query = {};
  for (let col in schema) {
    if (lineArr[schema[col]]) // don't add empty cells
      query[col] = lineArr[schema[col]];
  }
  return query;
}

stream.pipe(csvStream);

function convertRawQueryToSampleQueryType(query) {
  let sampleQuery = {}
  for (let knownHeadersCSVColName in knownHeaders) {
    if (knownHeadersCSVColName in query) {
      sampleQuery[knownHeaders[knownHeadersCSVColName]] = query[knownHeadersCSVColName];
    }
  }
  return sampleQuery;
}

function saveSampleQueries() {
  let outStr = `
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// WARNING - This file is generated from util-scripts/query-importer.js

import { SampleQuery } from "./base";

export const SampleQueries: SampleQuery[] = [
  `;
  formattedQueryArr = []
  for (let i = 0; i < queries.length; i++) {
    let csvQuery = queries[i];
    let sampleQuery = convertRawQueryToSampleQueryType(csvQuery);

    cleanupSampleQuery(sampleQuery);

    formattedQueryArr.push(JSON.stringify(sampleQuery, null, 4));
  }

  outStr += formattedQueryArr.join(",\n");

  outStr += ']'

  fs.writeFile("src/app/gen-queries.ts", outStr, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function cleanupSampleQuery(sampleQuery) {
  if (sampleQuery.method)
    sampleQuery.method = sampleQuery.method.toUpperCase().trim();

  // remove quotes on URL

  if (sampleQuery.requestUrl && sampleQuery.requestUrl[0] == '"') {
    try {
      sampleQuery.requestUrl = JSON.parse(sampleQuery.requestUrl);
    } catch (e) {
      console.log(e);
    }
  }

  if (sampleQuery.docLink && sampleQuery.docLink[0] == '"')
    sampleQuery.docLink = JSON.parse(sampleQuery.docLink)


  if (sampleQuery.headers) {
    let headers = sampleQuery.headers.split(/[\r\n]+/);
    sampleQuery.headers = [];
    for (let header of headers) {
      if (!header) continue;
      let name = header.split(":")[0].trim();
      let value = header.split(/:(.+)/)[1].trim();
      sampleQuery.headers.push({
        name: name,
        value: value
      })
    }
  }
}