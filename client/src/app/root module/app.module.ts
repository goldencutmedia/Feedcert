import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from '../services/api.service';
import {PageNotFoundComponent} from '../core module/util/page-not-found/page-not-found.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {CoreModule} from '@angular/flex-layout';
import {LoginModule} from '../login/login.module';
import {HomeModule} from '../home/home.module';
import {ToolbarModule} from '../shared module/toolbar/toolbar.module';
import {SampleModule} from '../sample/sample.module';
import {ConfirmationDialogComponent} from '../shared module/confirmation-dialog/confirmation-dialog.component';
import {RegisterModule} from '../register/register.module';
import {FormDialogComponent} from '../shared module/form-dialog/form-dialog.component';
import {SharedModule} from '../shared module/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../interceptors/auth.interceptor';
import {ErrorInterceptor} from '../interceptors/error.interceptor';
import {LoginService} from '../login/login.service';

registerLocaleData(localeDe, 'de', localeDeExtra);


@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LoginModule,
    HomeModule,
    RegisterModule,
    ToolbarModule,
    SampleModule,
    MatSidenavModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [
    ApiService,
    LoginService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
