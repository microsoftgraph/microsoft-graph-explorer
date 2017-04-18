import { GraphRequestHeader, RequestType } from "./base";
import { Headers } from "@angular/http"

export function createHeaders(explorerHeaders: GraphRequestHeader[]): Headers {
    let h = new Headers();

    for (let header of explorerHeaders) {
      if (!header.name) continue;
      h.append(header.name, header.value);
    }

    return h;
}

// http://stackoverflow.com/a/901144/2517012
export function getParameterByName(name, url?):string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}