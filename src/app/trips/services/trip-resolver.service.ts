import { Injectable } from '@angular/core';
import { 
    RouterStateSnapshot, 
    ActivatedRouteSnapshot, 
    Resolve } from '@angular/router';

import { Trip } from 'src/app/shared/models/trip';
import { TripsService } from './trip.service';
import { map } from 'rxjs/operators';
import { AUTH_KEY } from 'src/app/shared/constants';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TripResolver implements Resolve<Trip[]>{

    constructor(private tripsService: TripsService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Trip[] | import("rxjs").Observable<Trip[]> | Promise<Trip[]> {
        // removing JWT Token incase we reload the page after login
        if(!this.authService.isLoggedIn) {
            sessionStorage.removeItem(AUTH_KEY);
        }
        if(this.tripsService.trips.length !== 0) {
            return this.tripsService.trips;
        }
        return this.tripsService.getTrips()
        .pipe(map(data => {
            return data;
        }));
    }
}