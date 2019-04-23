import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    iconRegistry.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl('assets/outline-person-24px.svg'));
    iconRegistry.addSvgIcon(
      'calender',
      sanitizer.bypassSecurityTrustResourceUrl('assets/outline-event-24px.svg'));
    iconRegistry.addSvgIcon(
      'contacts',
      sanitizer.bypassSecurityTrustResourceUrl('assets/outline-contacts-24px.svg'));
    iconRegistry.addSvgIcon(
      'login',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-exit_to_app-24px (1).svg'));
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-timer-24px.svg'));
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
