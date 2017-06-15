// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { GraphApiCall } from "./base";

@Component({
  selector: 'method-badge',
  template: `
    <span class="request-badge" [ngClass]="query.method">{{query.method}}</span>
    `,
    styleUrls: ['./method-badge.component.css']
})
export class MethodBadgeComponent {
    @Input() query: GraphApiCall;
    
    successClass:string;
    
}