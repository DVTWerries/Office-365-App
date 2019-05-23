import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DayEventsComponent } from './components/day-events/day-events.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-events', pathMatch: 'full' },
  { path: 'calendar-events', component: CalendarEventsComponent, canActivate: [AuthGuard] },
  { path: 'calendar-events/:selectedDate', component: DayEventsComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contacts/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
