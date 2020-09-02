import { Injectable } from '@angular/core';
import { AUTH_KEY } from '../../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    saveToken(token: string) {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.setItem(AUTH_KEY, token);
    }

    getToken() {
        const token =  sessionStorage.getItem(AUTH_KEY);
        return token ? token : null;
    }

    clearToken() {
        sessionStorage.clear();
    }
}