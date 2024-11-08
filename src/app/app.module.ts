import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { UsersModule } from './users/users.module';
import { AppRoutingModule, routes } from './app.routes';
import { UsersService } from './users/users.service';
import { DevicesModule } from './devices/devices.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DevicesService } from './devices/devices.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
      HomeComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    UsersModule,
    DevicesModule,
    RouterModule.forRoot(routes),
    AsyncPipe,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
