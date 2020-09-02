import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_API } from '../shared/constants';
import { User } from '../shared/models/user';
import { SnackBarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [];
    isLoading = false;
    retrievedImage: any;
    constructor(private http: HttpClient,
                private snackBarService: SnackBarService,
                private router: Router,
                private aRoute: ActivatedRoute,) { }

    getUsers(): Observable<User[]> {
        this.isLoading = true;
        return this.http.get<User[]>(USER_API)
            .pipe(map(users => {
                this.users = users;
                this.isLoading = false;
                return this.users;
            }));
    }

    getUser(id: number): User {
        return this.users.find(user => user.id === id);
    }

    updateUser(user: User) {
        this.isLoading = true;
        this.http.put<User>(USER_API, user,
                            {observe: 'response'})
            .subscribe(response => {
                if(response.status=== 200) {
                    this.users = this.users.filter(item => {
                        item.id === user.id});
                    this.users.push(user);
                    this.isLoading = false;
                    this.snackBarService.show("User updated successfully");
                } else {
                    console.log(response.status + " with " + response.statusText);
                }
                this.router.navigate(["/users"], { relativeTo: this.aRoute});
            });
    }

    addUser(user: User) {
        // this.isLoading = true;
        this.http.post<User>(USER_API + "/create", user, 
            {observe: 'response'})
            .subscribe(response => {
                if(response.status=== 200) {
                    this.users.push(response.body);
                this.snackBarService.show("User added successfully");
                } else {
                    console.log(response.status + " with message " + response.statusText);
                }
                this.router.navigate(["/users"], { relativeTo: this.aRoute});
            });
    }

    deleteUser(userId: number) {
        let reqUrl = USER_API + "/" + userId;
        this.http.delete(reqUrl)
            .subscribe(data => {
                this.users = this.users.filter(user => {
                    return user.id !== userId;
                })
                this.snackBarService.show("Driver deleted successfully");
            });
    }

    saveProfilePic(id: number, imageData: FormData) {
        this.isLoading = true;
        this.http.post<User>(USER_API + `/${id}`, imageData,
                            {observe: 'response'})
            .subscribe(response => {
                if(response.status=== 200) {
                    this.snackBarService.show("Profile Picture updated successfully");
                } else {
                    console.log(response.status + " with " + response.statusText);
                }
            });
    }

    getProfilePic(id: number) {
        this.http.get(USER_API + `/${id}/profilePic`)
        .pipe(map(res => {
            console.log(res);
        })).subscribe(
            response => {
                const res = response;
                let base64Data = res;
                this.retrievedImage = 'data:image/jpeg;base64,' + base64Data;
            }
        );
    }
}