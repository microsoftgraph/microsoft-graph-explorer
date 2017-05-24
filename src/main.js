import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
import { enableProdMode } from "@angular/core";
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map