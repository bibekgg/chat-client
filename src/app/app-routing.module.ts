import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth-guard.service';
import { DeactiveGuard } from './guards/deactive-guard.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DeactiveGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [DeactiveGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
