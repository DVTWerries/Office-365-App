import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  spinner: boolean;
  displayedColumns: string[] = ['userName', 'email', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(UserDetailsComponent)
  private userDetailsComponent: UserDetailsComponent;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private userService: UserService,
              private userDetailsService: UserDetailsService) {
    iconRegistry.addSvgIcon(
      'view',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-remove_red_eye-24px.svg'));
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.spinner = true;
    this.dataSource.sort = this.sort;
    this.viewAllUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      },
      error => this.spinner = true,
      () => this.spinner = false
    );
  }

  viewAllUsers() {
    return this.userService.getAllUsers().pipe(
      map(users => users)
    );
  }

  viewUser(id: string) {
    this.userDetailsService.setID(id);
  }

}
