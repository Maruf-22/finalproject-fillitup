import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FillItUp';
  showLogout: boolean = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((state) => {
      if (state != null) this.showLogout = true;
      else this.showLogout = false;
    });
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }
}
