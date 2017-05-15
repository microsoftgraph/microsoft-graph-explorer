import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';

import { AppModule } from './app/app.module';
import { enableProdMode } from "@angular/core";

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);