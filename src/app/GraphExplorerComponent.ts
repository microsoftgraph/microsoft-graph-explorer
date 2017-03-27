import { getString } from "./api-explorer-helpers";
import { AppComponent } from "./app.component";

export let pathToBuildDir:string;

const scripts = document.getElementsByTagName("script")
const src = scripts[scripts.length-1].src;
pathToBuildDir = src.split('/').slice(0, -2).join('/');

export class GraphExplorerComponent {
  getStr(label:string):string {
    return getString(AppComponent.options, label);
  }
  getAssetPath(relPath:string):string {
    return pathToBuildDir + "/"+ relPath;
  }
}