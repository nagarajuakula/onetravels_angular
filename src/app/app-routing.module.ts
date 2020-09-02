import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'trips', 
    loadChildren: ()=> import('./trips/trips.module').then(m => m.TripsModule),
  },
  {
    path: 'users', 
    loadChildren: ()=> import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  { path: '', redirectTo: 'auth',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
