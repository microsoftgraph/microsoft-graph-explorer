import { GraphRequestHeader } from "./base";
import { Headers } from "@angular/http"

export function createHeaders(explorerHeaders: GraphRequestHeader[]): Headers {
    let h = new Headers();

    for (let header of explorerHeaders) {
      if (!header.name) continue;
      h.append(header.name, header.value);
    }

    return h;
}