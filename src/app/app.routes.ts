import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'devices', loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule) },
  { path: 'measurements', loadChildren: () => import('./measurements/measurements.module').then(m => m.MeasurementsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
