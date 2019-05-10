import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { OAuthService } from 'angular-oauth2-oidc';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy, OnInit {

  user: User;
  spinner: boolean;
  constructor(private oauthService: OAuthService,
              private userService: UserService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  ngOnInit() {
    this.getProfile();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public logOut() {
    this.oauthService.logOut();
  }

  getProfile() {
    this.spinner = true;
    this.userService.getprofile().subscribe(
      userProfile => this.user = userProfile,
      () => this.spinner = false,
      () => this.spinner = false
    );
  }

}
