import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public navOptions = [
    {
      icon: 'home',
      route: '',
    },
    {
      icon: 'camera_alt',
      route: 'camera',
    },
    {
      icon: 'map',
      route: 'map',
    },
  ];

  public login(): void {
    this.auth.loginWithRedirect();
  }

  public logout(): void {
    this.auth.logout();
  }

  constructor(public auth: AuthService) {}
}
