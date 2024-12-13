import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './models/device';
import { User } from '../users/models/user';
import { environment } from '../../environments/environment';
import { Measurement } from './models/measurement';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private readonly userApiUrl: string = environment.USER_API_BASE_URL;
  private readonly deviceApiUrl: string = environment.DEVICE_API_BASE_URL;
  // private readonly rabbitApiUrl: string = environment.RABIT_API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getAllDevices = ():Observable<Device[]> => this.httpClient.get<Device[]>(this.deviceApiUrl + '/api/devices');

  getDeviceById = (deviceId: string):Observable<Device> => this.httpClient.get<Device>(this.deviceApiUrl + `/api/devices/${deviceId}`);

  createDevice = (device: Device):Observable<Device> => this.httpClient.post<Device>(this.deviceApiUrl + '/api/devices', device);

  deleteDevice = (deviceId: string):Observable<Device> => this.httpClient.delete<Device>(this.deviceApiUrl + `/api/devices/${deviceId}`);

  editDevice = (deviceId: string, device: Partial<Device>):Observable<Device> => this.httpClient.put<Device>(this.deviceApiUrl + `/api/devices/${deviceId}`, device);

  getUsers = ():Observable<User[]> => this.httpClient.get<User[]>(this.userApiUrl + '/api/users');

  // readMessages = ():Observable<any> => this.httpClient.get<any>(this.rabbitApiUrl + '/read');

  // sendMessage = (message: Measurement):Observable<any> => this.httpClient.post<any>(this.rabbitApiUrl + '/send', { message });

  // countMeasurements = ():Observable<number> => this.httpClient.get<number>(this.rabbitApiUrl + '/count');
}
