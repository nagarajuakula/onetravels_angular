import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CanDeactivateGuard } from '../services/canDeactivate-guard.service';
import { UserResolver } from '../trips/services/user-resolver.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './home/users.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', 
    //   resolve: [ UserResolver ],
    canActivate: [AuthGuardService],
      children: [ 
        { path: 'profile', component: ProfileComponent },
        { path: 'edit', children: [
            { path: ':id', component: EditUserComponent, canDeactivate: [CanDeactivateGuard]}, 
        ] },
        { path: '', component: UsersComponent }
    ]
    }
    ];
@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule],
})
export class UsersRoutingModule {

}