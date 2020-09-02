import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { AppStorage } from 'src/app/shared/AppStorage';
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
    // base64Data: any;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        // if(!this.loggedInUser.profilePic) {
            this.userService.getProfilePic(this.loggedInUser.id);
            this.imageUrl= this.userService.retrievedImage;
        // }
          this.profileForm = new FormGroup({
            id: new FormControl(this.loggedInUser.id),
            username: new FormControl(this.loggedInUser.username, [Validators.required]),
            mobile: new FormControl(this.loggedInUser.mobile, [Validators.required]),
            password: new FormControl(this.loggedInUser.password, [Validators.required]),
            profilePic: new FormControl(this.loggedInUser.profilePic),
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
        
        this.userService.saveProfilePic(this.profileForm.controls.id.value, uploadImageData);
    }

    updateUser() {
        this.userService.updateUser(this.profileForm.value);
    }
}