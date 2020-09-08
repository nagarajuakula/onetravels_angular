import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivteDialogService } from 'src/app/services/canDeactivateDialog.service';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit{
    loggedInUser : User;
    selectedPhoto: File;
    profileForm: FormGroup;
    imageUrl: any;
    retrievedImage: any;
    isSubmitted = false;
    // base64Data: any;

    constructor(private userService: UserService,
        private dialogService: CanDeactivteDialogService,
        private router: Router) {}

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        // if(!this.loggedInUser.profilePic) {
            this.userService.getProfilePic(this.loggedInUser.id)
            .subscribe(
                response => {
                    // console.log(response);
                    let reader = new FileReader();
                    reader.addEventListener("load", () => {
                        this.retrievedImage = 'data:image/jpeg;base64,' + reader.result.toString().replace("data:application/json;base64,","");
                    });
    
                    if(response) {
                        reader.readAsDataURL(response);
                    }
                }
            );
        
          this.profileForm = new FormGroup({
            id: new FormControl(this.loggedInUser.id),
            username: new FormControl(this.loggedInUser.username, [Validators.required]),
            mobile: new FormControl(this.loggedInUser.mobile, [Validators.required]),
            password: new FormControl(this.loggedInUser.password, [Validators.required]),
            // profilePic: new FormControl(`${this.retrievedImage ? this.loggedInUser.username: ""}.jpg`)
            // profilePic: new FormControl("")
          });
    }

    onPhotoChanged(event) {
    if (event.target.files && event.target.files[0]) {
        this.selectedPhoto = event.target.files[0];

        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
            this.imageUrl = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
        }
    }

    saveProfilePic() {
        // if(this.selectedPhoto) {
            const uploadImageData = new FormData();
            uploadImageData.append('imageFile', this.selectedPhoto, this.selectedPhoto.name);
        // }
        
        this.userService.saveProfilePic(this.profileForm.controls.id.value, uploadImageData)
        ;
        
    }

    updateUser() {
        this.isSubmitted = true;
        // const username = this.profileForm.controls.username.value;
        // this.profileForm.controls.profilePic.setValue(`${username}.jpg`);
        this.userService.updateUser(this.profileForm.value);
    }

    cancel() {
        this.router.navigateByUrl('/users');
      }
    
      canDeactivate(): Observable<boolean> | boolean {
        if(this.profileForm.dirty && this.isSubmitted === false) {
          return this.dialogService.confirm('Discard changes to Driver?');
        }
        return true;
      }
}