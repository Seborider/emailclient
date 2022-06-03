import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl } from "@angular/forms";
import { map, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService ) {}

    validate = (control: AbstractControl) => {
        const { value } = control
        return this.authService.usernameAvailabe(value)
        .pipe(
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

