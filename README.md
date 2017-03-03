# Microsoft Graph Explorer
The Microsoft Graph explorer lets developers quickly navigate and test API endpoints.  The explorer is a client side web app written in JavaScript and powered by AngularJS.

Want to see what's new? Check the [changelog](changelog.md)!

![Autocompletion on API endpoints](https://devofficestaging.blob.core.windows.net/media/Default/Blogs/ge-animated.gif)

## Running the sample
* `npm install`
* `bower install`
* `npm run serve`
* Visit [http://localhost:3000/sample.html](http://localhost:3000/sample.html)

## Options
See `sample.html` for an example app that includes the Graph Explorer in a basic web page.  Use the following options to customize the Graph explorer.

```javascript
$scope.explorerOptions = {
    // defaults, optional
    AuthUrl: "https://login.microsoftonline.com",
    GraphUrl: "https://graph.microsoft.com",
    Language: "en-US",
    GraphVersions: ["v1.0", "beta"],

    // Required options
    ClientId: "ea6a39ca-c463-4903-a08b-6ab0be895ebd",
    AdminScopes: "User.ReadWrite.All Group.ReadWrite.All Directory.ReadWrite.All Directory.AccessAsUser.All IdentityRiskEvent.Read.All",
    UserScopes: "openid profile User.ReadWrite",
    RedirectUrl: "http://localhost:3000/sample.html"
};

```

Pass in these options to the ```api-explorer``` directive.
```html
    <api-explorer options="explorerOptions"></api-explorer>
```

## Development
* `npm run gulp` starts gulp which watches for changes in scripts, styles and other assets. Use `npm run build` for a one time build that terminates the gulp process.
* `node .\bundleLocFiles.js` combines all the loc files in `translation_files/` to `scripts/loc_strings.ts`
* `npm run serve` starts the development server and the sample page can be viewed at [http://localhost:3000/sample.html](http://localhost:3000/sample.html)

## Tests
* `npm test` to run tests from the command line. This uses mocha-phantomjs and runs tests for downloading and parsing metadata in addition to functional explorer tests.
* You can also run the mocha tests by launching [spec/GraphExplorerBrowserTests.html](spec/GraphExplorerBrowserTests.html) in a browser.

## Contributing
Please see the [contributing guidelines](CONTRIBUTING.md).

## Additional resources
* [Microsoft Graph website](https://graph.microsoft.io)
* [Office Dev Center](http://dev.office.com/)

## Copyright
Copyright (c) 2017 Microsoft. All rights reserved.
