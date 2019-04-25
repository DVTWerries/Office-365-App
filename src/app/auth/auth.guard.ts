import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/calender-event']);
      return false;
    } else {
      this.openDialog();
      return true;
    }
    // this.authService.currentLoginState.subscribe(isLoggedIn => {
    //   if (isLoggedIn) {
    //     this.router.navigate(['/calender-event']);
    //     return false;
    //   } else {
    //     console.log(isLoggedIn);
    //     return true;
    //   }
    // });
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '250px',
    });
  }
}
