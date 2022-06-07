import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'

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

interface signedinResponse {
  authenticated: boolean;
  username: string
}

interface signinCredentials {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signedin$ = new BehaviorSubject<boolean | null>(null)

  constructor(private http: HttpClient) { }

  usernameAvailabe(username: string) {
    return this.http.post<usernameAvailabeResponse>(
      this.rootUrl + '/auth/username', {
            username: username
        })
  }

  signup(credentials: signupCredentials) {
    return this.http.post<signupResponse>(
      `${this.rootUrl}/auth/signup`, credentials, 
    ).pipe(
      tap(() => {
        this.signedin$.next(true)
      })
    );
  }

  checkAuth() {
    return this.http.get<signedinResponse>(
      `${this.rootUrl}/auth/signedin`,
    ).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated)      
      })
    )
  }

  signout() {
    return this.http.post(
      `${this.rootUrl}/auth/signout`, {}
    ).pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }

  signin(credentials: signinCredentials) {
    return this.http.post(
      `${this.rootUrl}/auth/signin`, credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true)
      })
    )
  }
}
