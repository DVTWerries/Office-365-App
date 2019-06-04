import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://login.microsoftonline.com/da42b32f-4d0b-4079-951f-eb1dbea4e2c4/v2.0',
  redirectUri: window.location.origin,
  //clientId: '267660f1-edd5-40a2-9e2d-03f4203850b7',
  clientId: '8faad26f-980e-441d-9f63-f3b50b071d20',
  scope: 'openid profile Calendars.Read Contacts.Read Contacts.ReadWrite Notes.Create Notes.Read Notes.Read.All Notes.ReadWrite Notes.ReadWrite.All Tasks.Read Tasks.Read.Shared Tasks.ReadWrite User.ReadBasic.All User.Read User.ReadWrite'
};
