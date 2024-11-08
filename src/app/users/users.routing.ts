import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: UsersComponent, children: [
    { path: '', component: UserListComponent},
    { path: 'create', component: UserCreateComponent },
    { path: 'edit/:id', component: UserEditComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// export const UsersRoutes = RouterModule.forChild(routes);
export class UsersRoutingModule { }
