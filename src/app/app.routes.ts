import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BikeComponent } from './components/bike/bike.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { AuthGuard } from './services/auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'bike', component: BikeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NopageComponent }
];



