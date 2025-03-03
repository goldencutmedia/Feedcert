import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/root module/app.module';

if (environment.production) {
  enableProdMode();
}

// Klassisches Bootstrapping mit NgModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));