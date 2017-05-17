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

// https://github.com/Microsoft/rDSN/blob/f1f474da71003b72f445dcebd6638768301ce930/src/tools/webstudio/app_package/static/js/analyzer.js#L2
export function getParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}