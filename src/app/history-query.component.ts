// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
//  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ISampleQuery } from './base';
import { QueryRunnerService } from './query-runner.service';
import { QueryRowComponent } from './queryrow.component';

declare let moment: any;

@Component({
  selector: 'history-query-row',
  providers: [QueryRunnerService],
  template: `
    <query-row [query]="query">
        <div class="history-row-2">
            <span class="status-code" [ngClass]="successClass">{{query.statusCode}}</span>
            <span class="date">{{query.relativeDate}}</span>
            <span class="duration">{{query.duration}} {{getStr('milliseconds')}}</span>
        </div>
    </query-row>
    `,
  styles: [`
    .status-code.success {
        color: #05f505;
    }

    .status-code.error {
        color: #f7688d;
    }

    .status-code {
        float: left;
    }

    .date {
        font-weight: normal;
        color: #a0a0a0;
    }

    .duration {
        float: right;
        color: #a0a0a0;
    }

    .history-row-2 {
        text-align: center;
        margin-left: 70px;
    }
`],
})
export class HistoryRowComponent extends QueryRowComponent implements OnInit {
  public successClass: string;
  public updateMomentRef: NodeJS.Timer;
  @Input() public query: ISampleQuery;

  constructor(private changeDetectorRef: ChangeDetectorRef, public queryRunnerService: QueryRunnerService) {
        super(queryRunnerService);
    }

  public ngOnInit(): void {
        this.updateMomentRef = setInterval(() => {
            this.setRelativeDate();
        }, 1000 * 8);
        this.setRelativeDate();
        this.successClass = this.query.statusCode >= 200 && this.query.statusCode < 300 ? 'success' : 'error';
    }

  public setRelativeDate() {
        this.query.relativeDate = moment(this.query.requestSentAt).fromNow();
        this.changeDetectorRef.detectChanges();
    }

  public ngOnDestroy() {
      clearInterval(this.updateMomentRef);
      this.changeDetectorRef.detach();
    }
}
