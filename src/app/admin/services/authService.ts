import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken'); // Simulación con localStorage
  }

  login(token: string) {
    localStorage.setItem('adminToken', token);
  }

  logout() {
    localStorage.removeItem('adminToken');
  }
}
