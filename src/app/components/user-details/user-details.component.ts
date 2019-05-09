import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;
  idSubscription: Subscription;
  idSource = new BehaviorSubject<string>('');
  user: User;

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  @Input() isProfile: boolean;
  @Input() profileUser: User;

  ngOnInit() {
    if (this.isProfile) {
      this.user = this.profileUser;
    } else {
      this.routerSubscription = this.router.params
        .subscribe(params => this.idSource.next(params.id));

      this.idSubscription = this.idSource
        .pipe(mergeMap(id => this.userService.getUser(id)))
        .subscribe(user => this.user = user);
    }
  }

  ngOnDestroy() {
    if (this.isProfile) {
    } else {
      this.routerSubscription.unsubscribe();
      this.idSubscription.unsubscribe();
    }
  }

}
