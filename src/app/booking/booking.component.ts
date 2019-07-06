import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

	startHour = null;
	endHour = null;
	selectedRoom = null;
	meetingRoom = [];

	constructor(private _bookingService: BookingService) {
	}
	ngOnInit() {
		this._bookingService.getBookingRoomList().then((data:any) => {
			this.startHour = data.response.first_booking;
			this.endHour = data.response.last_booking;
			this.meetingRoom = data.response.meeting_room_list;
			this.selectedRoom = this.meetingRoom[0];
		})
	}

	onSelectRoom(room) {
		const result = this.meetingRoom.filter(rm => rm.room_name === room);
		this.selectedRoom = result[0];
	}
}
