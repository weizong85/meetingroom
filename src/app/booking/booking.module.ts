import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatNativeDateModule, 
  MatDatepickerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
 } from '@angular/material';
import { BookingRouting } from './booking.routing';
import { BookingComponent } from './booking.component';
import { BookingService } from './booking.service';
import { BookingWebServices } from './../../shared/web-services/booking.web-service';
import { RoomComponent } from './room/room.component';

@NgModule({
  imports: [
    CommonModule,
    BookingRouting,
    MatNativeDateModule, 
  MatDatepickerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
  ],
  exports: [
    MatNativeDateModule, 
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  declarations: [
    BookingComponent,
    RoomComponent
  ],
  providers: [
  	BookingService,
  	BookingWebServices,
    MatDatepickerModule
  ]
})
export class BookingModule { }

