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
* You'll need to register an app on [apps.dev.microsoft.com](https://apps.dev.microsoft.com) to configure the login page for your local Graph Explorer.  Under `Platforms` click `Add Platform` and select Web.  `Allow Implicit Flow` should be checked and set `http://localhost:3000` as the redirect URL.  You don't need a client secret since the explorer is a single page application. Select the delegated permissions that you'll want to use in your local Graph Explorer.
* Rename `secrets.sample.js` to `secrets.js` in the project root and insert your client ID.

## Other commands
* `npm test` to run tests from the command line for scenarios like parsing metadata and functional explorer tests.
* `npm run import:loc-strings` combines all the loc files in `translation_files/` to `scripts/loc_strings.ts`
* `npm run build:prod` to build the minified explorer for production use.

## Contributing
Please see the [contributing guidelines](CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

#### Sample queries

We want the explorer to have rich samples for calling all APIs in the Microsoft Graph. Choose the most relevant queries that demonstrate your feature. GET samples are the only queries that will work against our demo tenant. There are a few things that you need to check before you can add a sample query:
- [ ]	Does your sample query use [scopes]( https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-scopes) that are available via the [Azure AD v2.0 authentication]( https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-appmodel-v2-overview) endpoint? You’ll need to confirm this before you can add your sample.
- [ ]	Does Graph Explorer already have the scopes that support your query? If not, you’ll need to add the scopes. See the [permissions](#permissions) section for how you can add your scopes. 
- [ ]	Does documentation exist for functionality described in your sample query? [Create](https://github.com/microsoftgraph/microsoft-graph-docs) and publish the documentation before you add your sample.
- [ ]	Is the sample query functionality available on either the beta or v1.0 Graph endpoints? Confirm that the functionality is available on at least of one of these endpoints before submitting your sample query.
- [ ]	Are you certain that the functionality in the sample query will not change? We don’t want to have outdated samples, so only add samples when you are confident that the API won’t change.
- [ ]	Does the Graph metadata properly describe the functionality in the sample query? Confirm that either the [v1.0](https://graph.microsoft.com/v1.0/$metadata) or [beta]( https://graph.microsoft.com/beta/$metadata) metadata describes your functionality.

When your answer is yes to all of the questions, you are now ready to add your sample query. Before you do that, we need to check whether you require sample data.
- [ ]	Do your sample queries require data to be set up on the sample tenant? Contact the Graph Explorer maintainers to request sample data setup. 
- [ ]	Do your sample queries require placeholder data? If so, you’ll need to update [tokens.ts](./src/app/tokens.ts) with your placeholder data. Some sample queries have ids or other string constants that are different for authenticated users and the sample tenant. These tokens are maintained in tokens.ts. Token documentation can be found in the Token interface located in [base.ts](./src/app/base.ts).

Sample queries are added to [sample-queries.csv](./sample-queries.csv). You’ll add your sample query to this file. Make sure you fill out all of the fields that are applicable to your query. Run `npm run import:samples` after you’ve added your sample query. This will convert the samples in the CSV file to structured objects in src/app/get-queries. 

Once you've added your sample queries, you'll need to add your query titles and category name to the en-US loc string files found in the [translation](./translation) directory. We'll localize and import the loc strings later. 

Next, you need to run Graph Explorer on your development computer to verify that the samples are working as you expect. Go to [Running the explorer locally]( https://github.com/microsoftgraph/microsoft-graph-explorer#running-the-explorer-locally) to learn how to run Graph Explorer. Confirm that your samples work as expected with a signed in user account. 

Now that you have a working sample query, build the Graph Explorer so that your changes are available to be staged. Run `npm run build:prod`. 

You are now ready to open your pull request to submit your changes. All GET sample queries are tested when you push changes or create a pull request. These samples all must pass before we can review your changes.
 
**Note**: If you see Unexpected token T in JSON at position 0 as an error when you run npm test, when you push your changes, or when you open a pull request, then you may have an unexpected space in your sample. If you get a timeout error, restart the Travis CI job. This type of error is often intermittent. 

#### Permissions

Permissions like `Mail.Read` are listed in [scopes.ts](./src/app/scopes.ts) and each permission has a few properties, like its name and description.

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

## Known issues
* You cannot remove permissions by using the Graph Explorer UI. You will need to [remove the application consent](http://shawntabrizi.com/aad/revoking-consent-azure-active-directory-applications/) and then re-consent to remove permissions. I know, this is far from a good experience.

## Additional resources
* [Microsoft Graph website](https://graph.microsoft.io)
* [Office Dev Center](http://dev.office.com/)
* [Graph Explorer releases](https://github.com/microsoftgraph/microsoft-graph-explorer/releases)

## Copyright
Copyright (c) 2017 Microsoft. All rights reserved.
