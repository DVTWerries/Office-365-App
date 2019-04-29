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

  getAllUsers(): Observable<User[]> {
    return this.http.get<ODataResponse<User>>(`${environment.baseUrl}/users`)
      .pipe(map(x => x.value));
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
