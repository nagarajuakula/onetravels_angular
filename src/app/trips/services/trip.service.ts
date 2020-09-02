import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Trip } from 'src/app/shared/models/trip';
import { TRIPS_API } from 'src/app/shared/constants';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { User } from 'src/app/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class TripsService {

    trips: Trip[] = [];
    user: User;
    isLoading = true;
    constructor(private http: HttpClient,
                private snackBarService: SnackBarService) { 
                   this.user = JSON.parse(sessionStorage.getItem("loggedInUser"));
                }

    getTrips(): Observable<Trip[]> {
        if (this.trips.length !== 0) {
            return of(this.trips);
        }
        return this.http.get<Trip[]>(TRIPS_API + `/${this.user.id}`, {reportProgress: true})
            .pipe(map(data => {
                this.trips = data;
                this.isLoading = false;
                return this.trips;
            }));
    }

    getTrip(id: number): Trip {
        return this.trips.find(trip => {
            return trip.id === id
        });
    }

    updateTrip(trip: Trip) {
        this.isLoading = true;
        this.http.put<Trip>(TRIPS_API + `/trip/${trip.id}`, trip)
            .subscribe(data => {
                let index = this.trips.findIndex(prod => prod.id === trip.id);
                this.trips[index] = trip;
                this.isLoading = false;
                
            });
    }

    addTrip(trip: Trip) {
        this.isLoading = true;
        this.http.post<Trip>(TRIPS_API + `/create/${this.user.id}`, trip, { reportProgress: true})
            .subscribe(data => {
                this.isLoading = false;
                this.trips.push(data);
                this.snackBarService.show("Trip added successfully");
            });
    }

    deleteTrip(tripId: number) {
        let reqUrl = TRIPS_API + "/trip/" + tripId;
        this.http.delete(reqUrl,
            {
              reportProgress: true
            })
            .subscribe(data => {
                console.log(data);
                this.trips = this.trips.filter(trip => {
                    return trip.id !== tripId;
                })
            });
    }
}