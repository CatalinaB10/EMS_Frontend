import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsersModule } from './users/users.module';
import { AppRoutingModule, routes } from './app.routes';
import { DevicesModule } from './devices/devices.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MeasurementsModule } from './measurements/measurements.module';

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
    BrowserAnimationsModule,
    ButtonModule,
    MeasurementsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
