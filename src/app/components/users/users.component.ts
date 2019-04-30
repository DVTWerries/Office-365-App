import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { User } from 'src/app/models/user';

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
              private userService: UserService,
              private userDetailsService: UserDetailsService) {
    iconRegistry.addSvgIcon(
      'view',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-remove_red_eye-24px.svg'));

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
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

  viewUser(id: string) {
    this.userDetailsService.setID(id);
  }

}
