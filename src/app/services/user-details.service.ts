import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private selectedUserIdSource: string;

  setID(id: string) {
    this.selectedUserIdSource = id;
  }

  getID() {
    return this.selectedUserIdSource;
  }
}
