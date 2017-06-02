// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------


// Bundles files in translation_files/ to scripts/loc_strings.js


var fs = require('fs');

fs.readdir("translation_files", function(err, filenames) {
    if (err) {
        onError(err);
        return;
    }
    var fileStr = '// This is a generated file from bundleLocFiles.js \n\nexport const loc_strings = {};'
    var languageRead = [];
    filenames.forEach(function(filename) {
        languageRead.push(new Promise(function(resolve) {
            fs.readFile("translation_files/" + filename, 'utf-8', function(err, content) {
                fileStr += '\n\n' + 'loc_strings[\'' + filename.split(".")[0] + '\'] = ' + content;
                resolve();
            });
        }))
    });
    Promise.all(languageRead).then(() => {
        fs.writeFile("src/app/loc_strings.ts", fileStr, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
    })
});