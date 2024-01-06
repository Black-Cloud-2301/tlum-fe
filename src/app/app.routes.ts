import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/user/login/login.component";
import {authGuard} from "./core/auth/auth.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '', component: DashboardComponent, canActivate: [authGuard], data:{title: 'Home', breadcrumb: 'Home'}},
  {path: 'login', component: LoginComponent,  canActivate: [authGuard]},
  {path: 'welcome', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'welcome/home', component: DashboardComponent, canActivate: [authGuard]},
];
