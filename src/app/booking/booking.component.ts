import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

	constructor(private _bookingService: BookingService) {
	}
	selectedRoom = null;
	MeetingRoom = [];
	ngOnInit() {
		this._bookingService.getBookingRoomList().then((data:any) => {
			this.MeetingRoom = data.response.meeting_room_list;
			this.selectedRoom = this.MeetingRoom[0];
		})
	}

	onSelectRoom(room) {
		const result = this.MeetingRoom.filter(rm => rm.room_name === room);
		this.selectedRoom = result[0];
	}
}
