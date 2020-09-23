import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models';

@Injectable()
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    this.currentUser = {
      id: 1,
      userName,
      isAdmin: true
    } as User;
  }

  logout(): void {
    this.currentUser = null;
  }
}
