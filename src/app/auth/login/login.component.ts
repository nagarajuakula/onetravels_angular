import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("loginForm") loginForm: NgForm;
  errorMsg: string;
  user: User = new User();

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              private authService: AuthService,
              private tokenService: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.tokenService.clearToken();
    this.errorMsg = null;
  }

  login() {
    this.user.username = this.loginForm.controls['username'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.authService.login(this.user).subscribe(res => {
      const returnTo = this.aRoute.snapshot.queryParams['returnTo'];
      this.router.navigate([returnTo || "/trips" ]);
    },
    err => {
      if(err.status === 504) {
        this.errorMsg = "Server is not responding. Please try after some time";
      } else if(err.status == 403) {
        this.errorMsg = "Please use correct user name and password";
      }
      // console.log(err.statusText);
    }
    );
  }
}
