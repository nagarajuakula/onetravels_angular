import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const url = state.url;
        if (!this.authService.isLoggedIn) {
            sessionStorage.clear();
            return this.router.navigate(["/auth"], {
                queryParams: {
                    returnTo: url
                }
            });
        }

        if ((url.includes('/users') && !url.includes('profile')) &&
            (this.authService.userRole != 'ROLE_ADMIN')) {
            this.authService.isLoggedIn = false;
            return this.router.navigate(["/trips"]);
        }

        return true;
    }


}