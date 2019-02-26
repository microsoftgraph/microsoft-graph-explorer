const fs = require('fs');
const package = require('package');

fs.copyFileSync('dist/explorer.js', `dist/explorer_v${package.version}.js`);
