// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from './app.component';
import { AllowedGraphDomains, IGraphApiCall } from './base';
import { getString } from './localization-helpers';

export function getShortQueryText(query: IGraphApiCall) {
    let shortQueryUrl;

    if (query.requestUrl) {
        // Parse out /v1.0/me from graph.microsoft.com/v1.0/me for all domains
        for (const GraphDeploymentUrl of AllowedGraphDomains) {
            if (query.requestUrl.startsWith(GraphDeploymentUrl)) {
                shortQueryUrl = query.requestUrl.split(GraphDeploymentUrl)[1];
                break;
            }
        }
    }

    const queryText = query.humanName || shortQueryUrl;

    return (getString(AppComponent.Options, queryText)) || queryText;
}
