import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  template: `
    <span *ngIf="auth.user$ | async as user"><a href="#">{{user.name}}</a></span>`,

  standalone: true,
  imports: [AsyncPipe, NgIf]
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
