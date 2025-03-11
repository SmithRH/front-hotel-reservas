import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backUrl}/api/v1/users`, userData);
  }

  verifyRegister(verificationData: any): Observable<any> {
    return this.http.post(`${this.backUrl}/api/v1/verification`, verificationData)
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.backUrl}/api/v1/login`, userData)
  }

  recoverPassword(recoveryData: any): Observable<any> {
    return this.http.post(`${this.backUrl}/api/v1/recover-password`, recoveryData)
  }

  resetPassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.backUrl}/api/v1/reset-password`, passwordData)
  }
}
