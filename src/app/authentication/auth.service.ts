import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

declare let Msal: any;
@Injectable()
export class AuthService {
    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication((window as any).ClientId, '', this.authCallback, {});
    }

    public authCallback = (errorDesc, token, error) => {
        if (token) {
            localStorage.setItem('status', 'authenticated');
        } else if (errorDesc || error) {
            localStorage.setItem('status', 'anonymous');
        }
    }

    public async login() {
        return this.app.loginRedirect(this.getScopes());
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.getScopes())
            .then((accessToken) => {
                return accessToken;
            }, (error) => {
                return this.app.acquireTokenPopup(this.getScopes())
                    .then((accessToken) => {
                        return accessToken;
                    }, (err) => {
                        localStorage.setItem('status', 'anonymous');
                    });
            });
    }

    public getScopes() {
        return AppComponent.Options.DefaultUserScopes;
    }
}
