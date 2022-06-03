import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AsyncValidator, AbstractControl } from "@angular/forms";
import { map, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
    constructor(private http: HttpClient) {}

    validate = (control: AbstractControl) => {
        const { value } = control
        return this.http.post<any>('https://api.angular-email.com/auth/username', {
            username: value
        }).pipe(
           map(() => {
               return null;
           }),
           catchError((err) => {
               console.log(err);
               if (err.error.username) {
                   return of({ nonUniqueUsername: true })
               } else {
                   return of({ noConnection: true })
               }
            }) 
        )
    }    
        
}

