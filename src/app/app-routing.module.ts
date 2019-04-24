import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent},
  // { path: 'dashboard', component: CalenderEventsComponent},
  // { path: 'calender-events', component: DashboardComponent},
  // { path: 'personal/contacts', component: CardComponent},
  // { path: 'profile', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
