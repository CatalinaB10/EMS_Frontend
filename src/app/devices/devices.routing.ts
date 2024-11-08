import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: DevicesComponent, children: [
    { path: '', component: DeviceListComponent},
    { path: 'create', component: DeviceCreateComponent },
    { path: 'edit/:id', component: DeviceEditComponent },
  ] },
];

@NgModule
({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DevicesRoutingModule { }
// export const DevicesRoutes = RouterModule.forChild(routes);
