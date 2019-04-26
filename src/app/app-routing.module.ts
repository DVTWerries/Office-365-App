import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderEventsComponent } from './components/calender-events/calender-events.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'calender-event', component: CalenderEventsComponent },
  { path: 'organisation/contacts', component: UsersComponent },
  { path: 'organisation/contacts/userDetails', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
