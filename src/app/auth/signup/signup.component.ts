import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPwd: new FormControl("", [Validators.required, confirmPwdValidator]),
    })
  }

  signUp() {
    // console.log(this.signUpForm);
    const user = new User();
    user.username = this.signUpForm.controls['username'].value;
    user.password = this.signUpForm.controls['email'].value;
    user.password = this.signUpForm.controls['password'].value;
    this.authService.signup(user)
      .subscribe(res => {
        console.log(res);
      });
  }

}

export function confirmPwdValidator(control: AbstractControl): {[key: string]: any} {
     return 
     this.signUpForm.controls.password !== control.value ? { 'matchPassword': { value: control.value}}: null;
}
