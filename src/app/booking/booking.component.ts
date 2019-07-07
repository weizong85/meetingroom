import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
	meetingRoom = null;

	constructor(private _bookingService: BookingService) {
	}
	
	ngOnInit() {
		this._bookingService.getBookingRoomList().then((data:any) => {
			console.log('room list:', data.response.meeting_room_list);
			this.meetingRoom = data.response.meeting_room_list;
		})
	}
}
