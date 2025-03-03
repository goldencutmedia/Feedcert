import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // 🔥 Fehlender Import
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

// Material Modules
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DATE_LOCALE } from '@angular/material/core';

// Third-party
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// App Modules
import { AppRoutingModule } from '../app-routing.module';
import { SampleModule } from '../sample/sample.module';

// Components
import { AppComponent } from './app.component';

// Services & Interceptors
import { ApiService } from '../services/api.service';
import { LoginService } from '../login/login.service';
import { DialogService } from '../services/dialog.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { PageNotFoundComponent } from '../core module/util/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared module/sidebar/sidebar.component';

registerLocaleData(localeDe, 'de', localeDeExtra);

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule, // 🔥 Wichtig für HTTP-Requests
        BrowserAnimationsModule,

        // Material Modules
        MatSidenavModule,
        MatCardModule,
        MatChipsModule,
        MatGridListModule,
        MatListModule,
        MatDividerModule,

        // App Modules
        AppRoutingModule,
        SampleModule,
        FontAwesomeModule,
        RouterModule, MatDrawerContent, SidebarComponent, MatDrawer, MatDrawerContainer
    ],
    providers: [
        // Global Services
        LoginService,
        DialogService,

        // Interceptors
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // Configuration
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
