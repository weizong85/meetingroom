import { Injectable } from '@angular/core';
import { HttpServices } from './../../configuration/http.service';

@Injectable()
export class BookingWebServices {
	constructor(private _httpServices: HttpServices) {

	}

	getMeetingRoomList() {
		return this._httpServices.fetch('meeting-room-list');
	}
}