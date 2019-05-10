import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ODataResponse } from '../models/odataResponse';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(top?: number): Observable<ODataResponse<User[]>> {
    let queryString = '?$orderby=displayName';

    if (top) {
      queryString += `${queryString ? '&' : '?'}$top=${top}`;
    }

    return this.getNextUsers(`${environment.baseUrl}/users${queryString}`);
  }

  getNextUsers(nextLink: string): Observable<ODataResponse<User[]>> {
    console.log(nextLink);
    return this.http.get<ODataResponse<User[]>>(nextLink);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`)
      .pipe(map(x => x));
  }

  getprofile() {
    return this.http.get<User>(`${environment.baseUrl}/me`)
    .pipe(map(x => x));
  }
}
