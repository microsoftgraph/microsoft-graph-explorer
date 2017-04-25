// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from "./app.component";
import { GraphApiCall } from "./base";
import { getString } from "./api-explorer-helpers";

export function getShortQueryText(query:GraphApiCall) {
    let shortQueryUrl;
    if (query.requestUrl) {
        shortQueryUrl = query.requestUrl.split(AppComponent.Options.GraphUrl)[1];
    }

    let queryText = query.humanName || shortQueryUrl;

    return (getString(AppComponent.Options, queryText)) || queryText;
}