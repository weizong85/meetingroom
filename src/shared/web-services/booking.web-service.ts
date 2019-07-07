import { Injectable } from '@angular/core';
import { HttpServices } from './../../configuration/http.service';

@Injectable()
export class BookingWebServices {
	constructor(private _httpServices: HttpServices) {

	}

	getMeetingRoomList() {
		return this._httpServices.fetch('meeting-room-list');
	}

	getBookingSchedule(from, to, roomId) {
		let req = {
			from: from, 
			to: to, 
			roomId: roomId
		};
		return this._httpServices.fetch('booking-schedule', req, 'POST');
	}

	setBooking(from, to, roomId) {
		let req = {
			from: from, 
			to: to, 
			roomId: roomId
		};
		return this._httpServices.fetch('book-schedule', req, 'POST');
	}
}