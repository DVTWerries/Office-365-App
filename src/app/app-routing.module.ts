import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'calender-event', pathMatch: 'full' },
  { path: 'calender-event', component: CalendarEventsComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contacts/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
