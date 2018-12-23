import { Component } from '@angular/core';
import { localLogout } from './auth';

@Component({
    selector: 'logout',
    template: ``,
})

export class LogoutComponent {

    public ngOnInit() {
        localLogout();
        (window as any).location.href = '/';
    }

}
