import { NgForm } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { Observable } from 'rxjs';
import { User } from '../../users/models/user';
import { DevicesService } from '../devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css'],
})
export class DeviceEditComponent implements OnInit {
  users$!: Observable<User[]>;
  deviceService = inject(DevicesService);
  snackBar = inject(MatSnackBar);
  deviceId: string | null = null;
  device: Partial<Device> = {
    description: '',
    address: '',
    maxEnergyConsumption: 0,
    userId: undefined
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    if (this.deviceId) {
      this.deviceService.getDeviceById(this.deviceId).subscribe({
        next: (deviceData) => {
          this.device = deviceData;
        },
        error: (err) => {
          console.error('Error loading device data:', err);
        },
      });
    }
    this.users$ = this.deviceService.getUsers();
  }

  onSubmit() {
    if (this.device.description && this.deviceId) {
      this.deviceService.editDevice(this.deviceId, this.device).subscribe({
        next: () => {
          console.log('Device updated successfully');
          this.router.navigate(['/devices']);
          this.snackBar.open('Device updated successfully', 'Close');
          // Reset the form or navigate to another page as needed
        },
        error: (err) => {
          console.error('Error creating device:', err);
          this.snackBar.open('Error updating device', 'Close');
        },
      });
    }
  }
}
