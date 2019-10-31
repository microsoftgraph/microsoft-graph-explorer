import { Component } from '@angular/core';
import { GraphExplorerComponent } from '../GraphExplorerComponent';

@Component({
    selector: 'banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css'],
})
export class BannerComponent extends GraphExplorerComponent {
    public successClass = 'ms-Toggle-field';

    constructor() {
        super();
    }

    public switchToggle() {
        this.successClass = 'ms-Toggle-field is-selected';
        const path = location.href;
        const urlObject: URL = new URL(path);
        const { protocol, hostname, pathname, port } = urlObject;
        let url = `${protocol}//${hostname}${(port) ? ':' + port : ''}${pathname}`;
        url = url.replace(/\/$/, '');
        window.location.href = url.includes('localhost') ? 'http://localhost:3001' : `${url}/preview`;
    }

}
