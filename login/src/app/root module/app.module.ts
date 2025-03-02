import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from '../services/api.service';
import {PageNotFoundComponent} from '../shared module/page-not-found/page-not-found.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {CoreModule} from '@angular/flex-layout';
import {LoginModule} from '../login/login.module';
import {RegisterModule} from '../register/register.module';
import {SharedModule} from '../shared module/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from '../interceptors/error.interceptor';
import {LoginService} from '../services/login.service';

registerLocaleData(localeDe, 'de', localeDeExtra);


@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LoginModule,
    RegisterModule,
    MatSidenavModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [
    ApiService,
    LoginService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
