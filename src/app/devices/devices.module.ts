import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { DevicesRoutingModule } from './devices.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    RouterOutlet,
    ReactiveFormsModule,
    DevicesRoutingModule
  ],
  declarations: [DevicesComponent, DeviceCreateComponent, DeviceEditComponent, DeviceListComponent]
})
export class DevicesModule { }
