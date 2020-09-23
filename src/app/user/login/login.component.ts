import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  errorMessage: string;
  pageTitle: 'Login';

  constructor(private authService: AuthService, private router: Router) {

  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {

      const userName = loginForm.value.userName;
      const password = loginForm.value.password;

      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/people']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password';
    }
  }
}
