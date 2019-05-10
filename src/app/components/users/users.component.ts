import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

import { map } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {

  users: any[];
  spinner: boolean;
  displayedColumns: string[] = ['userName', 'email', 'action'];
  dataSource = new MatTableDataSource();
  mobileQuery: MediaQueryList;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(UserDetailsComponent)
  private userDetailsComponent: UserDetailsComponent;
  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private userService: UserService) {

    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
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

}
