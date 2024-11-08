import { Component, inject, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';
import { Observable } from 'rxjs';
import { Device } from './models/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [] // provider for http client
})
export class DevicesComponent {
  title = "Devices list";
}
