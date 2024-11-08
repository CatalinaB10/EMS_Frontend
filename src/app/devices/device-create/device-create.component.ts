import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevicesService } from '../devices.service';
import { Device } from '../models/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {

  deviceService = inject(DevicesService);
  snackBar = inject(MatSnackBar);

  device: Partial<Device> = {
    description: '',
    address: '',
    maxEnergyConsumption: 0,
    userId: undefined
  };

  users$ = this.deviceService.getUsers();

  constructor(private router: Router) { }

  onSubmit() {
    if (this.device.description) {
      this.deviceService.createDevice(this.device as Device).subscribe({
        next: (createdDevice) => {
          console.log('Device created successfully:', createdDevice);
          this.snackBar.open('Device created successfully', 'Close');
          // Reset the form or navigate to another page as needed
        },
        error: (err) => {
          console.error('Error creating device:', err);
          this.snackBar.open('Error creating device', 'Close');
        }
      });
      this.router.navigate(['/devices']);
    }
  }

  onCancel() {
    // redirect back to '/devices'
    this.router.navigate(['/devices']);
  }

}
