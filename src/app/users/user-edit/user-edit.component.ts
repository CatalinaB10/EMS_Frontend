import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UsersService, FormsModule, ReactiveFormsModule]
})
export class UserEditComponent implements OnInit {

  user: Partial<User> = {
    name: '',
    role: 'CLIENT'
  };

  snackBar = inject(MatSnackBar);
  userId: string | null = null;
  userService = inject(UsersService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (userData) => {
          this.user = userData;
        },
        error: (err) => {
          console.error('Error loading user data:', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.userId && this.user.name && this.user.role) {
      this.userService.editUser(this.userId, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/users']); // Navigate to user list or desired page
          this.snackBar.open('User updated successfully', 'Close');
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.snackBar.open('Error updating user', 'Close');
        }
      });
    }
  }

}
