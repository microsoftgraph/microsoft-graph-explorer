import { GraphRequestHeader } from "./base";
import { Headers } from "@angular/http"

export function createHeaders(explorerHeaders: GraphRequestHeader[]): Headers {
    let h = new Headers();

    for (let header of explorerHeaders) {
      if (!header.name) {
          continue;
      }
      // Handle backslash that is returned in odata.etag before double-quote
      // as the etag would otherwise be invalid and request will fail
      // if user just does copy-paste odata.etag value from the previous response
      if (header.name === "If-Match"){
          h.append(header.name, header.value.replace(/\\"/g, '"'));
      }
      else{
      h.append(header.name, header.value);
      }
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