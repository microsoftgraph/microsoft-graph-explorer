# Microsoft Graph Explorer
[![Build Status](https://travis-ci.org/microsoftgraph/microsoft-graph-explorer.svg?branch=master)](https://travis-ci.org/microsoftgraph/microsoft-graph-explorer)

The [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) lets developers quickly navigate and test API endpoints.

The Graph Explorer is written in [TypeScript](https://www.typescriptlang.org/) and powered by:
* [Angular 4](https://angular.io/)
* [Office Fabric](https://dev.office.com/fabric)
* [Microsoft Web Framework](https://getmwf.com/)

## Running the explorer locally

* `npm install` to install project dependencies. `npm` is installed by default with [Node.js](https://nodejs.org/).
* `npm start` starts the TypeScript compiler in watch mode and the local server. It should open your browser automatically with the Graph Explorer at [http://localhost:3000/](http://localhost:3000).

#### Enabling authentication with your own credentials
* You'll need to register an app on [apps.dev.microsoft.com](https://apps.dev.microsoft.com) to configure the login page for your local Graph Explorer.  Under `Platforms` click `Add Platform` and select Web.  `Allow Implicit Flow` should be checked and set `http://localhost:3000` as the redirect URL.  You don't need a client secret since the explorer is a single page application.
* Rename `secrets.sample.js` to `secrets.js` in the project root and insert your client ID.

## Other commands
* `npm test` to run tests from the command line for scenarios like parsing metadata and functional explorer tests.
* `npm run import:loc-strings` combines all the loc files in `translation_files/` to `scripts/loc_strings.ts`
* `npm run build:prod` to build the minified explorer for production use.

## Contributing
Please see the [contributing guidelines](CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

#### Sample queries
We want the explorer to have rich samples for calling all APIs in the Microsoft Graph. If you have ideas for sample queries, you can edit `sample-queries.csv` and then run `npm run import:samples`. This will convert the samples in the CSV file to structured objects in `src/app/gen-queries.ts`.

Some sample queries have ids or other string constants that are different for authenticated users and
the sample tenant.  These tokens are maintained in [tokens.ts](src/app/tokens.ts) and more documentation for them can be found in [base.ts](src/app/base.ts).

When you send a pull request, please commit both the `sample-queries.csv` and the `src/app/gen-queries.ts` file. We will then review your sample queries, and ensure our demo tenant has some sample data for that query.

**Note**: If you see `Unexpected token T in JSON at position 0` as an error when you run `npm test`, then you may have an unexpected space in your sample. Make sure you run `npm test` before you submit your samples.

#### Permissions

Permissions like `Mail.Read` are listed in [scopes.ts](src/app/scopes.ts) and each permission has a few properties, like its name and description.

```javascript
 {
   name: "Calendars.ReadWrite",
   description: "Have full access to user calendars",
   longDescription: "Allows the app to create, read, update, and delete events in user calendars.",
   preview: false,
   admin: false
 }
```
Edits to this file can be made directly from Github.com so you don't even have to clone the project to add a new permission.  You can also see [a merged pull request](https://github.com/microsoftgraph/microsoft-graph-explorer/pull/48) for adding the `Reports.Read.All` permission.

## Additional resources
* [Microsoft Graph website](https://graph.microsoft.io)
* [Office Dev Center](http://dev.office.com/)
* [Graph Explorer releases](https://github.com/microsoftgraph/microsoft-graph-explorer/releases)

## Copyright
Copyright (c) 2017 Microsoft. All rights reserved.
