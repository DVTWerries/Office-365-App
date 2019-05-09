import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {

  users: User[];
  spinner: boolean;
  displayedColumns: string[] = ['userName', 'email', 'action'];
  dataSource = new MatTableDataSource();
  mobileQuery: MediaQueryList;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(UserDetailsComponent)
  private userDetailsComponent: UserDetailsComponent;
  private mobileQueryListener: () => void;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private userService: UserService) {
    iconRegistry.addSvgIcon(
      'view',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-remove_red_eye-24px.svg'));

    this.mobileQuery = media.matchMedia('(min-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.spinner = true;
    this.dataSource.sort = this.sort;
    this.viewAllUsers()
      .subscribe(
        users => {
          this.users = users;
          this.dataSource = new MatTableDataSource(this.users);
        },
        error => this.spinner = true,
        () => this.spinner = false);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  viewAllUsers() {
    return this.userService.getAllUsers()
      .pipe(map(users => users));
  }

  viewUserDetails() {
    console.log(1);
    this.router.navigateByUrl('/contacts/userDetails');
  }

}
