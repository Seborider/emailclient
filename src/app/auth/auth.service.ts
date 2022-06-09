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

interface signinResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signedin$ = new BehaviorSubject<boolean | null>(null)
  username = ''

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
      tap(({username}) => {
        this.signedin$.next(true)
        this.username = username
      })
    );
  }

  checkAuth() {
    return this.http.get<signedinResponse>(
      `${this.rootUrl}/auth/signedin`,
    ).pipe(
      tap(({ authenticated, username}) => {
        this.signedin$.next(authenticated)
        this.username = username      
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
    return this.http.post<signinResponse>(
      `${this.rootUrl}/auth/signin`, credentials
    ).pipe(
      tap(({ username }) => {
        this.signedin$.next(true)
        this.username = username
      })
    )
  }
}
