import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';
import { LoginComponent } from './components/login-dialog/login-dialog.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ProfileComponent } from './components/profile/profile.component';

import { FilterPipe} from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarEventsComponent,
    LoginComponent,
    UsersComponent,
    UserDetailsComponent,
    ProfileComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    OAuthModule.forRoot()
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faEdit, faUserCircle, faCalendar, faHourglassStart,
      faHourglassEnd, faMapMarkerAlt, faSignOutAlt, faUsers, faBars, faEye );
  }

}
