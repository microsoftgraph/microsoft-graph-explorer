# Microsoft Graph Explorer
The [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) lets developers quickly navigate and test API endpoints.

The Graph Explorer is written in [TypeScript](https://www.typescriptlang.org/) and powered by:
* [Angular 4](https://angular.io/)
* [Office Fabric](https://dev.office.com/fabric)
* [Microsoft Web Framework](http://getmwf.com/)

## Running the explorer locally
* `npm install`
* `bower install`
* `npm start` starts the TypeScript compiler in watch mode and the local server. It should open your browser automatically with the Graph Explorer at [http://localhost:3000/](http://localhost:3000).

## Other Commands
* `npm test` to run tests from the command line for scenarios like parsing metadata and functional explorer tests.
* `node .\bundleLocFiles.js` combines all the loc files in `translation_files/` to `scripts/loc_strings.ts`
* `npm run build:prod` to build the minified explorer for production use.

## Contributing
Please see the [contributing guidelines](CONTRIBUTING.md).

## Additional resources
* [Microsoft Graph website](https://graph.microsoft.io)
* [Office Dev Center](http://dev.office.com/)

## Copyright
Copyright (c) 2017 Microsoft. All rights reserved.
