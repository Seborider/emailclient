import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface usernameAvailabeResponse {
  available: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailabe(username: string) {
    return this.http.post<usernameAvailabeResponse>(
      'https://api.angular-email.com/auth/username', {
            username: username
        })
  }
}
