import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface usernameAvailabeResponse {
  available: boolean
}

interface signupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface signupResponse {
  username: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }

  usernameAvailabe(username: string) {
    return this.http.post<usernameAvailabeResponse>(
      this.rootUrl + '/auth/username', {
            username: username
        })
  }

  signup(credentials: signupCredentials) {
    return this.http.post<signupResponse>(
      `${this.rootUrl}auth/signup`, credentials
    )
  }
}
