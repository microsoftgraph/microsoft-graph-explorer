import { getString } from "./api-explorer-helpers";
import { AppComponent } from "./app.component";
import { isAuthenticated } from "./auth";
import { ExplorerValues } from "./base";


export let pathToBuildDir:string;

const scripts = document.getElementsByTagName("script")
const src = scripts[scripts.length-1].src;
pathToBuildDir = src.split('/').slice(0, -2).join('/');

export class GraphExplorerComponent {

  explorerValues = AppComponent.explorerValues;

  getStr(label:string):string {
    return getString(AppComponent.Options, label);
  }
  getAssetPath(relPath:string):string {
    return pathToBuildDir + "/"+ relPath;
  }

  isAuthenticated = () => {
    return isAuthenticated();
  }
}