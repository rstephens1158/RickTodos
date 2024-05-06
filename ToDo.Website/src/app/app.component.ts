import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgbCollapseModule, NgbModule, NgbNavItem} from '@ng-bootstrap/ng-bootstrap';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {AsyncPipe, CommonModule, isPlatformBrowser} from '@angular/common';
import {RouterLink} from "@angular/router";
import {BrowserOnlyAuthService} from "./browser-only-auth-service.service";
import {AuthButtonComponent} from "./auth-button/auth-button.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, NgbNavModule,
    CommonModule, RouterLink, AuthButtonComponent, AsyncPipe,
    UserProfileComponent, NgbNavModule, NgbCollapseModule
  ],
  providers: [],


  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDo.Website';
  isCollapsed = true;
  public auth: BrowserOnlyAuthService;
  constructor( auth: BrowserOnlyAuthService) {
    this.auth = auth;
  }


  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }
}

