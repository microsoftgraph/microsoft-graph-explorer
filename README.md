# Microsoft Graph Explorer
The Microsoft Graph explorer lets developers quickly navigate and test API endpoints.  The explorer is a client side web app written in JavaScript and powered by Angularjs.

## Running the sample
* `npm install`
* `bower install`
* `npm run serve`
* Visit `http://localhost:3000/sample.html`

## Options
See `sample.html` for an example app that includes the Graph Explorer in a basic web page.
### Scopes

```javascript
$scope.explorerScopes = "openid User.Read User.ReadWrite User.ReadBasic.All Mail.ReadWrite";
```

```html
<api-explorer scopes="explorerScopes"></api-explorer>
```

### Client Id

```javascript
$scope.clientId = "b89b88a5-084c-4498-7a7b-efd5cea66cec";

```
```html
<api-explorer client-id="clientId"></api-explorer>
```


### Custom strings
All strings can be replaced including labels like "Sign in" or "Request Body".  To see a list of strings, see `api-explorer-directive.js`.


```javascript
$scope.customStrings = {
    "using_sample_tenant": "Using sample account"
};

```
```html
<api-explorer strings="customStrings"></api-explorer>
```

### Administrator Scopes

```javascript
$scope.adminScopes = "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All"
```
```html
<api-explorer admin-scopes="adminScopes"></api-explorer>
```



## Development
* `npm run gulp` starts gulp

## Tests
* `npm test`

## Contributing
Please see the [contributing guidelines](CONTRIBUTING.md).

## Additional resources
* [Microsoft Graph website](https://graph.microsoft.io)
* [Office Dev Center](http://dev.office.com/)

## Copyright
Copyright (c) 2017 Microsoft. All rights reserved.
