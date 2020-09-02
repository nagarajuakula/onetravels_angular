import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TripsService } from '../services/trip.service';
import { Trip } from 'src/app/shared/models/trip';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-trip-details',
    templateUrl: './trip-details.component.html'
}
)
export class TripDetailsComponent implements OnInit {

    selectedtripId: number;
    isFromCart = false;
    isLoggedIn = false;
    trip: Trip;

    constructor(private router: Router,
        private aroute: ActivatedRoute,
        private authService: AuthService,
        private tripsService: TripsService,
        private snackBarService: SnackBarService) { }

    ngOnInit() {
        this.selectedtripId = +this.aroute.snapshot.params['id'];
        this.aroute.snapshot.queryParams['fromCart'] ? this.isFromCart = true : this.isFromCart = false;
        this.trip = this.tripsService.getTrip(this.selectedtripId);
        this.isLoggedIn = this.authService.isLoggedIn;
    }

    editTrip() {
        this.router.navigate(["../edit-trip", this.trip.id], { relativeTo: this.aroute });
    }

    deleteTrip() {
        this.tripsService.deleteTrip(this.trip.id);
        this.snackBarService.show("trip deleted successfully");
    }
}