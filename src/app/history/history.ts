// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { AppComponent } from '../app.component';
import { IGraphApiCall } from '../base';

const LocalStorageKeyGraphRequestHistory = 'GRAPH_V4.1_REQUEST_HISTORY';

export function saveHistoryToLocalStorage(requestHistory: IGraphApiCall[]) {
    try {
        localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
    } catch (e) {
        AppComponent.messageBarContent = {
            backgroundClass: 'ms-MessageBar--warning',
            icon: 'ms-Icon--Info',
            text: 'You have reached the browser storage limit,' +
              ' click show more under the history heading to remove items.',
        };
    }
}

export function loadHistoryFromLocalStorage(): IGraphApiCall[] {
    const possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);

    if (!possibleHistory) {
        return [];
    }

    return JSON.parse(possibleHistory);
}
