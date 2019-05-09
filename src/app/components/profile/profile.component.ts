import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
