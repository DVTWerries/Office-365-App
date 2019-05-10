import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTableDataSource, MatSort } from '@angular/material';

import { map, debounceTime, scan, tap, filter, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ODataResponse } from 'src/app/models/odataResponse';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  users: any[];
  spinner: boolean;
  displayedColumns: string[] = ['userName', 'email', 'action'];
  dataSource = new MatTableDataSource();
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  private pageSize = 100;
  next$ = new BehaviorSubject<{ nextPosition: number, nextLink: string }>({ nextPosition: 1, nextLink: null });
  infinate$: Observable<{ nextLink: string, data: User[] }>;

  constructor(changeDetectorRef: ChangeDetectorRef,
              private userService: UserService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const nextForwardOnly$ = this.next$.pipe(
      debounceTime(200),
      scan<{ nextPosition: number, nextLink: string }, { max: number, value: { nextPosition: number, nextLink: string } }>(
        (accu, x) => ({ max: x.nextPosition > accu.max ? x.nextPosition : accu.max, value: x }),
        ({ max: 0, value: { nextLink: null, nextPosition: 0 } })
      ),
      tap(x => console.log(x)),
      filter(x => x.value.nextPosition >= x.max),
      map(x => x.value)
    );

    this.infinate$ = nextForwardOnly$.pipe(
      tap(() => this.spinner = true),
      mergeMap(x => x.nextLink ? this.userService.getNextUsers(x.nextLink) : this.userService.getUsers(this.pageSize)),
      map<ODataResponse<User[]>, { nextLink: string, data: User[] }>(x => ({ nextLink: x['@odata.nextLink'], data: x.value })),
      scan((acc, resp) => ({ nextLink: resp.nextLink, data: [...acc.data, ...resp.data] }), { nextLink: null, data: [] }),
      tap(x => console.log(x)),
      tap(() => this.spinner = false)
    );
  }

  loadNextUsers(nextPosition: number, nextLink: string) {
    if (nextLink) {
      this.next$.next({ nextPosition, nextLink });
    }
  }
}
