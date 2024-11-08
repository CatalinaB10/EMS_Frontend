import { Device } from './../devices/models/device';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from './models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  devicesToDelete: Observable<Device[]> | undefined;
  private readonly userApiUrl: string = environment.USER_API_BASE_URL;
  private readonly deviceApiUrl: string = environment.DEVICE_API_BASE_URL;

  constructor(private httpClient : HttpClient) { }

  getAllUsers = ():Observable<User[]> => this.httpClient.get<User[]>(this.userApiUrl +'/api/users');

  createUser = (user: User):Observable<User> => this.httpClient.post<User>(this.userApiUrl + '/api/users', user);


  deleteUser(userId: string): Observable<User> {
    return this.httpClient.get<Device[]>(this.deviceApiUrl + '/api/devices').pipe(
      map(devices => devices.filter(device => device.userId === userId)),
      switchMap(devices => {
        const deleteDeviceRequests = devices.map(device =>
          this.httpClient.delete(this.deviceApiUrl +`/api/devices/${device.id}`)
        );
        return forkJoin(deleteDeviceRequests);
      }),
      switchMap(() => {
        return this.httpClient.delete<User>( this.userApiUrl+`/api/users/${userId}`);
      }),
      catchError(error => {
        console.error(`Failed to delete user or devices for user ${userId}`, error);
        return throwError(() => new Error(`Failed to delete user or devices`));
      })
    );
  }

  editUser = (userId: string, user: Partial<User>):Observable<User> => this.httpClient.put<User>(this.userApiUrl + `/api/users/${userId}`, user);

  getUserById = (userId: string):Observable<User> => this.httpClient.get<User>(this.userApiUrl + `/api/users/${userId}`);

}
