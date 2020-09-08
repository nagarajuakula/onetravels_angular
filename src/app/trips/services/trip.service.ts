import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Trip } from 'src/app/shared/models/trip';
import { TRIPS_API } from 'src/app/shared/constants';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TripsService{
    tripsSubject = new Subject<Trip[]>();
    trips: Trip[] = [];
    isLoading = true;
    constructor(private http: HttpClient,
                private snackBarService: SnackBarService,
                private router: Router,
                private aRoute: ActivatedRoute) {  }

    getTrips(): Observable<Trip[]> {
        if (this.trips.length !== 0) {
            return of(this.trips);
        }
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        return this.http.get<Trip[]>(TRIPS_API + `/${user.id}`, {reportProgress: true})
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
                this.tripsSubject.next(this.trips.slice());
                this.isLoading = false;
                this.snackBarService.show("Trip updated successfully");
                this.router.navigate(["/trips"], { relativeTo: this.aRoute});
            });
    }

    addTrip(trip: Trip) {
        this.isLoading = true;
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        this.http.post<Trip>(TRIPS_API + `/create/${user.id}`, trip, { reportProgress: true})
            .subscribe(data => {
                this.isLoading = false;
                this.trips.push(data);
                this.tripsSubject.next(this.trips.slice());
                this.snackBarService.show("Trip added successfully");
                this.router.navigate(["/trips"], { relativeTo: this.aRoute});
            });
    }

    deleteTrip(tripId: number) {
        let reqUrl = TRIPS_API + "/trip/" + tripId;
        this.http.delete(reqUrl,
            {
              responseType: 'text'
            })
            .subscribe(data => {
                console.log(data);
                this.trips = this.trips.filter(trip => {
                    return trip.id !== tripId;
                });
                this.tripsSubject.next(this.trips.slice());
            });
    }
}