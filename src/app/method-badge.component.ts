import { Component, OnInit, Input } from '@angular/core';
import { GraphApiCall } from "./base";

@Component({
  selector: 'method-badge',
  template: `
    <span class="request-badge" [ngClass]="query.method">{{query.method}}</span>
    `,
    styles: [`
      .request-badge {
          border: 1px solid gray;
          min-width: 55px;
          display: inline-block;
          padding: 2px;
          text-align: center;
          margin-right: 15px;
          font-weight: 600;
          color: white;
          line-height: normal;
      }

      .request-badge.GET {
          background-color: #000fdf
      }

      .request-badge.POST {
          background-color: #008412
      }

      .request-badge.PATCH {
          background-color: #be8b00
      }

      .request-badge.DELETE {
          background-color: #a10000  
      }

`]
})
export class MethodBadgeComponent {
    @Input() query: GraphApiCall;
    
    successClass:string;
    
}