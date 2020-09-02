import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CanDeactivateGuard } from '../services/canDeactivate-guard.service';
import { ReceiptComponent } from './print/receipt.component';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';


const routes: Routes = [
  { 
    path: '', 
    canActivate: [ AuthGuardService], 
    children: [
      { 
        path: 'edit-trip',
        children: [
          { path: 'new', component: TripComponent},
          { path: ':id', component: TripComponent, canDeactivate: [CanDeactivateGuard]},
        ]
      },
      { path: 'print/:id', component: ReceiptComponent},
      { path: '', component: TripsComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
