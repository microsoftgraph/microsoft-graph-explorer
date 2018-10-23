import { Injectable } from '@angular/core';
import { AppComponent } from "../app.component";

@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientID: "<Client ID Value>",
        graphScopes: ['openid', 'profile', 'User.ReadWrite', 'User.ReadBasic.All', 'Sites.ReadWrite.All', 'Contacts.ReadWrite', 'People.Read', 'Notes.ReadWrite.All', 'Tasks.ReadWrite', 'Mail.ReadWrite', 'Files.ReadWrite.All', 'Calendars.ReadWrite']
    };
    private app: any;

    constructor() {
        // this.applicationConfig.clientID = AppComponent.Options.ClientId;
        this.app = new Msal.UserAgentApplication(this.applicationConfig.clientID, '', () => {
            // callback for login redirect
        });
    }

    public login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes)
            .then(idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }, () => {
                return null;
            });
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}