import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from '../../devices/models/device';
import { User } from '../models/user';
import { UsersService } from '../users.service';
import { DevicesService } from '../../devices/devices.service';
import { DataSyncService } from '../../data-sync.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userService = inject(UsersService);
  deviceService = inject(DevicesService);
  users$!: Observable<User[]>
  // userDevices$!: Observable<Device[]>;
  snackBar = inject(MatSnackBar);
  dataSyncService = inject(DataSyncService);


  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: (deletedUser) => {
        console.log('User deleted successfully:', deletedUser);
        // Refresh the list of users
        this.snackBar.open('User deleted successfully', 'Close');
        this.users$ = this.userService.getAllUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.snackBar.open('Error deleting user', 'Close');
      }
    });

    this.router.navigate(['/users']);
  }

  editUser(userId: string, user: User) {
    this.userService.editUser(userId, user).subscribe({
      next: (editedUser) => {
        console.log('User edited successfully:', editedUser);
        // Refresh the list of users
        this.snackBar.open('User edited successfully', 'Close');
        this.users$ = this.userService.getAllUsers();
      },
      error: (err) => {
        console.error('Error editing user:', err);
        this.snackBar.open('Error editing user', 'Close');
      }
    });
    this.router.navigate(['/users']);
  }

  deleteUserAndNotify(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      console.log('User and associated devices deleted');
      this.dataSyncService.notifyUserDeleted(); // Notify other components
    });
  }

}
