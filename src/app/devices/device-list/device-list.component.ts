import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DevicesService } from '../devices.service';
import { Device } from '../models/device';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSyncService } from '../../data-sync.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  constructor(private router: Router) { }

  deviceService = inject(DevicesService);
  dataSyncService = inject(DataSyncService);
  snackBar = inject(MatSnackBar);
  devices$!: Observable<Device[]>;

  ngOnInit() : void{
    this.devices$ = this.deviceService.getAllDevices();
    this.dataSyncService.userDeleted$.subscribe(() => {
      this.refreshDeviceList(); // Refresh devices when a user is deleted
    });
  }
  refreshDeviceList() {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices$ = of(devices);
    });
  }

  deleteDevice(deviceId: string) {
    this.deviceService.deleteDevice(deviceId).subscribe({
      next: (deletedDevice) => {
        console.log('Device deleted successfully:', deletedDevice);
        this.snackBar.open('Device deleted successfully', 'Close');
        this.devices$ = this.deviceService.getAllDevices();
      },
      error: (err) => {
        console.error('Error deleting device:', err);
        this.snackBar.open('Error deleting device', 'Close');
      }
    });
    this.router.navigate(['/devices']);
  }

  editDevice(deviceId: string, device: Device) {
    this.deviceService.editDevice(deviceId, device).subscribe({
      next: (editedDevice) => {
        console.log('Device edited successfully:', editedDevice);
        this.snackBar.open('Device edited successfully', 'Close');
        this.devices$ = this.deviceService.getAllDevices();
      },
      error: (err) => {
        console.error('Error editing device:', err);
        this.snackBar.open('Error editing device', 'Close');
      }
    });
    this.router.navigate(['/devices']);
  }

  assignToUser () {
    this.router.navigate(['/devices/assign']);
  }
}
