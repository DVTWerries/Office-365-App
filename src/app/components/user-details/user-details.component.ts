import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User;

  constructor(private userDetailsService: UserDetailsService, private userService: UserService ) { }

  ngOnInit() {
    this.id = this.userDetailsService.getID();
    this.userService.getUser(this.id).subscribe(
      user => this.user = user
    );
  }

}
