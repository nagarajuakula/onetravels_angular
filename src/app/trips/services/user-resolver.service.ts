import { Injectable } from '@angular/core';
import { 
    RouterStateSnapshot, 
    ActivatedRouteSnapshot, 
    Resolve } from '@angular/router';

import { map } from 'rxjs/operators';
import { AUTH_KEY } from 'src/app/shared/constants';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User[]>{

    constructor(private userService: UserService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | import("rxjs").Observable<User[]> | Promise<User[]> {
        // removing JWT Token incase we reload the page after login
        if(!this.authService.isLoggedIn) {
            sessionStorage.removeItem(AUTH_KEY);
        }
        if(this.userService.users.length !== 0) {
            return this.userService.users;
        }
        return this.userService.getUsers()
        .pipe(map(data => {
            return data;
        }));
    }
}