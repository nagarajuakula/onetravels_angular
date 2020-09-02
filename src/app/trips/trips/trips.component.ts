import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TripsService } from '../services/trip.service';
import { Trip } from '../../shared/models/trip';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { jsPDF } from 'jspdf';
import { Overlay } from '@angular/cdk/overlay';
import { ReceiptComponent } from 'src/app/trips/print/receipt.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];
  displayedColumns: string[] = ['id', 'date', 'from_location', 'to_location', 'distance', 'edit', 'delete', 'print'];
  dataSource: MatTableDataSource<Trip>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              public tripsService: TripsService,
              public authService: AuthService,
              private snackBarService: SnackBarService) { }

  ngOnInit(): void {

      this.tripsService.getTrips().subscribe(trips => {
        this.trips = trips;
        this.tripsService.isLoading = false;
        this.dataSource = new MatTableDataSource(this.trips);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  goToTrip(tripId: number) {
    this.router.navigate(['../trips/' + tripId], { relativeTo: this.aRoute});
  }

  deleteTrip(tripId: number) {
    this.tripsService.deleteTrip(tripId);
    this.snackBarService.show("trip deleted successfully");
}

editTrip(tripId: number) {
  this.router.navigate(['../trips/edit-trip/' + tripId], { relativeTo: this.aRoute});
}

addTrip() {
  this.router.navigate(['/trips/edit-trip/new'], { relativeTo: this.aRoute});
}

printTrip(id: number) {
  this.router.navigate(['print', id], { relativeTo: this.aRoute});
}
}
