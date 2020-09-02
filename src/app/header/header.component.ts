import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { TripsService } from '../trips/services/trip.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    
    constructor(private router: Router,
                private aRoute: ActivatedRoute,
                public authService: AuthService,
                public tripservice: TripsService) {}

    ngOnInit() { }

    addTrip() {
        this.router.navigate(['/trips/edit-trip/new'], { relativeTo: this.aRoute});
    }

    login() {
        this.router.navigate(['/'], { relativeTo: this.aRoute});
    }

    logout() {
        window.sessionStorage.removeItem("loggedInUser");
        this.authService.isLoggedIn = false;
        this.authService.user = null;
        this.router.navigate(["auth/login"]);
    }
}