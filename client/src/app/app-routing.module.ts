import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {LoginComponent} from './login/loginForm/login.component';
import {LoginService} from './login/login.service';
import {HomeComponent} from './home/homeView/home.component';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthGuard} from './guards/auth.guard';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginservice.isAdministrator
      .pipe(
        take(1),
        map((isAdministrator: boolean) => {
          if (!isAdministrator) {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        }));
  }
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'samples',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sample/sample.module').then(mod => mod.SampleModule)
  },
  {
    path: 'companies',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => import('./company/company.module').then(mod => mod.CompanyModule)
  },
  {
    path: 'suppliers',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => import('./supplier/supplier.module').then(mod => mod.SupplierModule)
  },
  {
    path: 'users',
    pathMatch: 'prefix',
    canActivate: [AuthGuard, AdminRoleGuard],
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'rating',
    pathMatch: 'prefix',
    canActivate: [AuthGuard, AdminRoleGuard],
    loadChildren: () => import('./rating/rating.module').then(mod => mod.RatingModule)
  },
  {
    path: 'documents',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: () => import('./document-viewer/document-viewer.module').then(mod => mod.DocumentViewerModule)
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminRoleGuard]
})
export class AppRoutingModule {
}
