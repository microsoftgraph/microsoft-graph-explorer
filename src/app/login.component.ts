import { Component, Input } from '@angular/core';
import { AuthenticationStatus } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";

@Component({
  selector: 'authentication',
  styles: [`
      #ms-signin-button {
          max-width: 215px;
          margin: 20px 0 0px 0px;
          cursor: pointer;
      }

      #signout {
          margin-right: 32px;
          max-width: 100%;
          display: block;
          text-align: right;
      }


      #authDrawer {
          min-height: 96px;
      }

      #userDisplayName {
          color: #e2e2e2
      }

      #userMail {
          color: #a0a0a0;
      }

      #authenticating-progress-bar {
          margin: 0px auto;
      }


`],
  template: `
    <div *ngIf="getAuthenticationStatus() == 'anonymous'">
        <div tabindex="-1">{{getStr('Using demo tenant')}}</div>
        <div tabindex="-1">{{getStr('To access your own data:')}}</div>
        <img id="ms-signin-button" alt="{{getStr('sign in')}}" src="{{getAssetPath('assets/images/MSSignInButton.svg')}}" (click)="login()"/>
    </div>
    `
    // <div ng-show="getAuthenticationStatus() == 'authenticating'">
    //     <div class="c-progress f-indeterminate-local f-progress-small" id="authenticating-progress-bar" role="progressbar" aria-valuetext="Loading..." tabindex="0" aria-label="indeterminate local small progress bar">
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //     </div>
    // </div>
    // <div ng-show="getAuthenticationStatus() == 'authenticated'" ng-cloak>
    //     <div class="ms-Persona" ng-class="{'user-no-image': !userInfo.profileImageUrl}">
    //         <div class="ms-Persona-imageArea" ng-if="userInfo.profileImageUrl">
    //             <img class="ms-Persona-image" ng-src="{{userInfo.profileImageUrl}}">
    //         </div>
    //         <div class="ms-Persona-details">
    //             <div class="ms-Persona-primaryText" id='userDisplayName' ng-if="userInfo.displayName">{{userInfo.displayName}}</div>
    //             <div class="ms-Persona-secondaryText" id='userMail' ng-if="userInfo.mail">{{userInfo.mail}}</div>
    //         </div>
    //     </div>
    //     <a href="#" id="signout" class="c-hyperlink" tabindex=0 ng-click="logout()">{{::getStr(['sign out'])}}</a>
        
    // </div>
    // `,
})
export class AuthenticationComponent extends GraphExplorerComponent{
  title = 'Tour of Heroes!!';


  getAuthenticationStatus = ():AuthenticationStatus => {
    return "anonymous"
  }

  // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
  login = function () {
      let loginProperties = {
        display: 'page',
        response_type: "id_token token",
        nonce: 'graph_explorer',
        prompt: 'select_account',
        msafed: 0
      }

      hello('msft').login(loginProperties, () => {
        debugger;
      });
  };

}
