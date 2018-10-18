// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
// See License in the project root for license information.
// ------------------------------------------------------------------------------

import { IExplorerOptions } from './base';
import { loc_strings } from './loc_strings';


export function getString(options: IExplorerOptions, label: string) {
    if (label in loc_strings[options.Language]) {
        return loc_strings[options.Language][label];
    }
    return loc_strings['en-US'][label];
}