import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  spinner: boolean;
  user: User;

  constructor(private router: ActivatedRoute, private userService: UserService ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.spinner = true;
    this.userService.getprofile().subscribe(
      userProfile => this.user = userProfile,
      () => this.spinner = false,
      () => this.spinner = false
    );
  }
}
