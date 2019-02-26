const fs = require('fs');
const thisApp = require('./package');

const dataToAppend = '' +
    `
!function() { return window['appVersion'] = '${thisApp.version}' }()
    `;

fs.appendFileSync('dist/explorer.js', dataToAppend);
fs.copyFileSync('dist/explorer.js', `dist/explorer_v${thisApp.version}.js`);
