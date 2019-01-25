// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { GraphExplorerComponent } from '../GraphExplorerComponent';

@Component({
  selector: 'canary',
  styleUrls: ['./canary.component.css'],
  templateUrl: './canary.component.html',
})
export class CanaryComponent extends GraphExplorerComponent {

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  public getCanaryStatus() {
    return true;
  }

}
