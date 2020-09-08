import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivteDialogService } from 'src/app/services/canDeactivateDialog.service';

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
  maxDate: Date;
  isSubmitted = false;

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              public tripService: TripsService,
              private dialogService: CanDeactivteDialogService) {
                const currentYear = new Date().getFullYear();
                const currentDate = new Date().getDate();
                const currentMonth = new Date().getMonth();
                this.maxDate = new Date(currentYear, currentMonth, currentDate);
               }

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
    this.isSubmitted = true;
    if(this.editMode) {
      this.tripService.updateTrip(this.tripForm.value);
    } else {
      this.tripService.addTrip(this.tripForm.value);
    }
    
  }

  cancel() {
    this.router.navigateByUrl('/trips');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(this.tripForm.dirty && this.isSubmitted === false) {
      return this.dialogService.confirm('Discard changes to trip?');
    }
    return true;
  }

}
