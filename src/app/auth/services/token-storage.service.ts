import { Injectable } from '@angular/core';
import { AUTH_KEY } from '../../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    saveToken(token: string) {
        localStorage.removeItem(AUTH_KEY);
        localStorage.setItem(AUTH_KEY, token);
    }

    getToken() {
        const token =  localStorage.getItem(AUTH_KEY);
        return token ? token : null;
    }

    clearToken() {
        localStorage.clear();
    }
}