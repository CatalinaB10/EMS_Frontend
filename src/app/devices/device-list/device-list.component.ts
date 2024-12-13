
import { Measurement } from './../models/measurement';
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

  // sendMessage(deviceId: string) {
  //   // this.deviceService.countMeasurements().subscribe(count => {
  //     // var nextId = count + 1;
  //     var measurement: Measurement = {
  //       id: 0,
  //       value: Math.random() * 100,
  //       deviceId: deviceId,
  //       timestamp: new Date()
  //     };

  //     this.deviceService.sendMessage(measurement).subscribe({
  //       next: (message) => {
  //         console.log('Message sent successfully:', message);
  //         this.snackBar.open('Message sent successfully', 'Close');
  //       },
  //       error: (err) => {
  //         console.error('Error sending message:', err);
  //         this.snackBar.open('Error sending message', 'Close');
  //       }
  //     });
  //   // });
  // }

  // readMessage() {
  //   this.deviceService.readMessages().subscribe({
  //     next: (message) => {
  //       console.log('Message read successfully:', message);
  //       this.snackBar.open('Message read successfully', 'Close');
  //     },
  //     error: (err) => {
  //       console.error('Error reading message:', err);
  //       this.snackBar.open('Error reading message', 'Close');
  //     }
  //   });
  // }
}
