import { Component, OnInit, Input } from '@angular/core';
import { BookingService } from './../booking.service';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
 	@Input() meetingRoom = []
 	selectedRoom:any;
 	roomSchedule = [];
 	minDate = null;
 	date = null;
 	startHour = null;
 	endHour = null;

	constructor(private _bookingService: BookingService) {
	}

	ngOnInit() {
		this.date = new FormControl(new Date(new Date().setHours(0,0,0,0)));
 		this.minDate = moment().toDate();
 		if(this.meetingRoom.length > 0) {
	 		this.selectedRoom = this.meetingRoom[0];
	 		this.startHour = this.selectedRoom.first_booking;
	 		this.endHour = this.selectedRoom.last_booking;
			this.getBookingSchedule();
 		}
	}

	/* 
		On date change, fetch room booking schedule
	*/
	dateChange(e) {
		this.date = e;
		this.getBookingSchedule();
	}

	/* 
		On room change, fetch room booking schedule
	*/
	onSelectRoom(room) {
		const result = this.meetingRoom.filter(rm => rm.room_name === room);
		this.selectedRoom = result[0];
		this.getBookingSchedule();
	}

	/* 
		Using timestamp to get schedule.
			- Date and time will be handled
			- Easy enhancement to retrieve weekly & monthly schedule
			- Future ebhancement can include 15mins or 30mins booking
	*/
	getBookingSchedule() {
		let _startTime = moment(this.date.value).startOf("day").unix();
		let _endTime = moment(this.date.value).endOf("day").unix();
		this._bookingService.getBookingSchedule(_startTime, _endTime, this.selectedRoom.room_id).then((data:any) => {
			this.roomSchedule = data.response.bookings;
		});
	}

	bookRoom(h) {
		let hours = h.slice(0, 2);
		let mins = h.slice(2, 4);
		var duration = moment.duration({'hours' : hours});
		let from = moment(this.date.value).add(duration).unix();
		let to = moment(this.date.value).add(duration).add(1, 'hours').unix();
		this._bookingService.setBooking(from, to, this.selectedRoom.room_id).then((data:any) => {
			this.getBookingSchedule();
		});
	}

	checkSchedule(h) {
		let result = 'available';
		this.roomSchedule.forEach(function(schedule) {
			let _startTime = moment.unix(schedule.startTime).format("HH") + '00';
			let _endTime = moment.unix(schedule.endTime).format("HH") + '00';
			if(parseInt(h) >= parseInt(_startTime) &&  parseInt(h) < parseInt(_endTime)) {
				result = 'unavailable';
			}
		});
		return result;
	}

	pad_with_zeroes(number, length) {
	    let number_string = '' + number;
	    while (number_string.length < length) {
	        number_string = '0' + number_string;
	    }

	    return number_string;
	}

	getHour(h) {
		let hour = this.pad_with_zeroes(parseInt(this.startHour) + (h * 100),4);
		return hour;
	}

	getAvailableHour(v) {
		return Array(((this.endHour - this.startHour)/100)+v).fill(0).map((x,i)=>i);
	}
}
