import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AppStorage } from './shared/AppStorage';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'One Travels';
  constructor(public authService: AuthService) {
  }
}
