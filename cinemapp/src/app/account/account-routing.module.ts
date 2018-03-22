import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

/**
 * @todo Add AuthGuard
 */
const routes: Routes = [
  { path: 'account', children: [
    { path: 'register', component: RegisterComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'profile', component: ProfileComponent },
  ]}
];

/**
 * @todo Add AuthGuard provider
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
