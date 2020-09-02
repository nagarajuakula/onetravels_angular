import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { SharedModule } from '../shared/shared.module';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReceiptComponent } from './print/receipt.component';

@NgModule({
  declarations: [
    TripsComponent,
    TripComponent,
    TripDetailsComponent,
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TripsRoutingModule,
    SharedModule
  ]
})
export class TripsModule { }
