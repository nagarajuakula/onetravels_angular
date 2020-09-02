import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/shared/models/trip';
import { TripsService } from '../services/trip.service';

import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html'
})
export class ReceiptComponent implements OnInit {

    trip: Trip;
    constructor(private tripsService: TripsService,
                private aRoute: ActivatedRoute) {}
    ngOnInit(): void {
        const id = this.aRoute.snapshot.params['id'];
        console.log("Id is " + id);
        this.trip = this.tripsService.getTrip(1);
    }

    print() {
        const data = document.getElementById("receipt");
        html2canvas(data).then((canvas) => {
             // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("ikismail.pdf"); // Generated PDF
            });
    }
}