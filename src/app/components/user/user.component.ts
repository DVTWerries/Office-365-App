import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private userService: UserService) {
    iconRegistry.addSvgIcon(
      'view',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-remove_red_eye-24px.svg'));
  }

  displayedColumns: string[] = ['userName', 'email', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.viewAllUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      }
    );
  }

  viewAllUsers() {
    return this.userService.getAllUsers().pipe(
      map(users => users)
    );
  }

  viewUser(id: string) {
    this.userService.getUser(id);
  }

}
