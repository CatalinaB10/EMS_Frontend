import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
    AsyncPipe,
    UsersRoutingModule
  ],
  declarations: [UsersComponent, UserCreateComponent, UserEditComponent, UserListComponent]
})
export class UsersModule { }
