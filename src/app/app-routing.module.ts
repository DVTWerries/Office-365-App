import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderEventsComponent } from './components/calender-events/calender-events.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AppComponent, canActivate: [AuthGuard]},
  { path: 'calender-event', component: CalenderEventsComponent},
  // { path: 'dashboard', component: CalenderEventsComponent},
  // { path: 'personal/contacts', component: CardComponent},
  // { path: 'profile', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
