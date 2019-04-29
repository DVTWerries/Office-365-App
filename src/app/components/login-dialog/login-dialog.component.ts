import { Component, OnInit, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {}

  public login(): void {
    this.oauthService.initImplicitFlow();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
