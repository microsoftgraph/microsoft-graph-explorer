import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

// @ts-ignore
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
import { AppModule } from './app/app.module';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
