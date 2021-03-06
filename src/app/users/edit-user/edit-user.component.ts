import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivteDialogService } from 'src/app/services/canDeactivateDialog.service';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  editMode = false;
  isSubmitted = false;

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              private userService: UserService,
              private dialogService: CanDeactivteDialogService) { }

  ngOnInit(): void {
    let userId = +this.aRoute.snapshot.params['id'];
    if(userId) {
      this.editMode = true;
      this.user = this.userService.getUser(userId);
    } else {
    this.user = { id: 0, username: null, mobile: null, password: null};
    }

    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      username: new FormControl(this.user.username, [Validators.required]),
      mobile: new FormControl(this.user.mobile, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }

  addOrEditUser() {
    if(this.editMode) {
      this.userService.updateUser(this.userForm.value, null);
    } else {
      this.userService.addUser(this.userForm.value);
    }
  }

  cancel() {
    this.router.navigateByUrl('/users');
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(this.userForm.dirty && this.isSubmitted === false) {
      return this.dialogService.confirm('Discard changes to Driver?');
    }
    return true;
  }
 }
