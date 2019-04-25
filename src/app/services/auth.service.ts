import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setLoggedIn(state: boolean) {
    localStorage.setItem('loggedIn', JSON.stringify(state));
  }
}
