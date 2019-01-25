// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { GraphExplorerComponent } from '../GraphExplorerComponent';

@Component({
  selector: 'canary',
  styleUrls: ['./canary.component.css'],
  templateUrl: './canary.component.html',
})
export class CanaryComponent extends GraphExplorerComponent {

  constructor() {
    super();
  }

  public disableCanary() {
    localStorage.setItem('GRAPH_MODE', null);
    localStorage.setItem('GRAPH_URL', 'https://graph.microsoft.com');
    location.reload();
  }

}
