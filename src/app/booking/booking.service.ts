import { Injectable } from '@angular/core';
import { BookingWebServices } from './../../shared/web-services/booking.web-service';

@Injectable()
export class BookingService {
	constructor(private _bookingWebService: BookingWebServices) {}

	getBookingRoomList() {
		return this._bookingWebService.getMeetingRoomList();
	}

	getBookingSchedule() {
		// to pass in date, room id
	}

	setBooking() {
		// to pass in date, time, duration, room id
	}
}