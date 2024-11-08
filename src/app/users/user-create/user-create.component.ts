import { routes } from './../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../users.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UsersService, FormsModule]
})
export class UserCreateComponent {

  userService = inject(UsersService);
  snackBar = inject(MatSnackBar);

  user: Partial<User> = {
    name: '',
    role: 'CLIENT'
  };

  constructor(private router: Router) { }

  onSubmit() {
    if (this.user.name && this.user.role) {
      this.userService.createUser(this.user as User).subscribe({
        next: (createdUser) => {
          console.log('User created successfully:', createdUser);
          this.snackBar.open('User created successfully', 'Close');
          // Reset the form or navigate to another page as needed
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.snackBar.open('Error creating user', 'Close');
        }
      });
      this.router.navigate(['/users']);
    }
  }

  onCancel() {
    // redirect back to '/users'
    this.router.navigate(['/users']);
  }
}
