import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OAuthService } from 'angular-oauth2-oidc';
import { CanActivate } from '@angular/router/src/utils/preactivation';

import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private oauthService: OAuthService, public dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const claims = this.oauthService.getAccessToken();
    if (!claims) {
      this.openDialog();
      return false;
    } else {
      return true;
    }
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
