import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    iconRegistry.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl('assets/outline-person-24px.svg'));
    iconRegistry.addSvgIcon(
      'calender',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-event-24px.svg'));
    iconRegistry.addSvgIcon(
      'contacts',
      sanitizer.bypassSecurityTrustResourceUrl('assets/outline-contacts-24px.svg'));
    iconRegistry.addSvgIcon(
      'login',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-exit_to_app-24px.svg'));
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-exit_to_app-24px.svg'));
    iconRegistry.addSvgIcon(
      'menu-burger',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-menu-24px.svg'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

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
