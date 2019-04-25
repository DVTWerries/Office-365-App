import { Component, OnInit, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, public dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService) { }

  ngOnInit() {}

  public login(): void {
    this.oauthService.initImplicitFlow();
    this.authService.setLoggedIn(true);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
