import { Injectable } from '@angular/core';
declare var Msal: any;
@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientId: (window as any).ClientId,
        graphScopes: ['openid', 'profile', 'User.ReadWrite', 'User.ReadBasic.All', 'Sites.ReadWrite.All',
        'Contacts.ReadWrite', 'People.Read', 'Notes.ReadWrite.All', 'Tasks.ReadWrite', 'Mail.ReadWrite',
        'Files.ReadWrite.All', 'Calendars.ReadWrite'],
    };
    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication(this.applicationConfig.clientId, '', this.authCallback, {});
    }

    public authCallback = (errorDesc, token, error) => {
        if (token) {
            localStorage.setItem('status', 'authenticated');
        } else if (errorDesc || error) {
            localStorage.setItem('status', 'anonymous');
        }
    }

    public async login() {
        return this.app.loginRedirect(this.applicationConfig.graphScopes);
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then((accessToken) => {
                return accessToken;
            }, (error) => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then((accessToken) => {
                        return accessToken;
                    }, (err) => {
                        localStorage.setItem('status', 'anonymous');
                    });
            });
    }
}
