
import { Component, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [] // provider for http client
})
export class UsersComponent  {

  title = "Users List";

}
