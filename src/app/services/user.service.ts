import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ODataResponse } from '../models/ODataResponse';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<ODataResponse<User>>(`${baseUrl}/users`).pipe(
      map(x => x.value)
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/${id}`).pipe(
      map(x => x)
    );
  }
}
