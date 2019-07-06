import { Injectable } from '@angular/core';
import { BookingWebServices } from './../../shared/web-services/booking.web-service';

@Injectable()
export class BookingService {
	constructor(private _bookingWebService: BookingWebServices) {}

	getBookingRoomList() {
		return this._bookingWebService.getMeetingRoomList();
	}

	getBookingSchedule(from, to, roomId) {
		return this._bookingWebService.getBookingSchedule(from, to, roomId);// to pass in date, room id
	}

	setBooking(from, to, roomId) {
		return this._bookingWebService.setBooking(from, to, roomId);// to pass in date, room id
		// to pass in date, time, duration, room id
	}
}