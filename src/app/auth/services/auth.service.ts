import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user';
import { AUTH_KEY, AUTH_API, USER_API } from '../../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    userRole: any;
    errorMessage = '';
    user: User;
    constructor(private http: HttpClient) {}

    login(user: User) {
        return this.http.post(AUTH_API + "/login", user, 
                        { responseType: 'text'})
         .pipe(map(res => {
             localStorage.setItem(AUTH_KEY, JSON.parse(res)["jwt"]);
             localStorage.setItem("userRole", JSON.parse(res)["roles"]);
             this.userRole = JSON.parse(res)["roles"];
             let userFromBackend = JSON.parse(res)["userId"];
             localStorage.setItem("loggedInUser", JSON.stringify(userFromBackend));
             this.isLoggedIn = true;
         }));
    }

    delete(id: number) {
        return this.http.delete(USER_API + "/user/" + id);
    }
}