import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) {}

    show(message: String) {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: { message: message, icon: "check" },
          duration: 1000,
        });
      }
}