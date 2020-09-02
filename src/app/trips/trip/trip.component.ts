import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from 'src/app/shared/models/trip';
import { TripsService } from '../services/trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  tripForm: FormGroup;
  trip: Trip;
  editMode = false;

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              public tripService: TripsService) { }

  ngOnInit(): void {
    let tripId = +this.aRoute.snapshot.params['id'];
    if(tripId) {
      this.editMode = true;
      this.trip = this.tripService.getTrip(tripId);
    } else {
    this.trip = { id: 0, from_location: null, to_location: null, date: null, distance: 0};
    }

    this.tripForm = new FormGroup({
      id: new FormControl(this.trip.id),
      from_location: new FormControl(this.trip.from_location, [Validators.required]),
      to_location: new FormControl(this.trip.to_location, [Validators.required]),
      date: new FormControl(this.trip.date, [Validators.required]),
      distance: new FormControl(this.trip.distance),
    });
  }

  addOrEditTrip() {
    if(this.editMode) {
      this.tripService.updateTrip(this.tripForm.value);
    } else {
      this.tripService.addTrip(this.tripForm.value);
    }
    this.router.navigate(["/trips"], { relativeTo: this.aRoute});
  }

  cancel() {
    this.router.navigateByUrl('/trips');
  }

}
