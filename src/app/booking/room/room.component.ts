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
 	@Input() startHour:any;
 	@Input() endHour:any;
 	@Input() selectedRoom:any;
 	roomSchedule = [];
 	minDate = null;
 	date = null;

	constructor(private _bookingService: BookingService) {
	}

	ngOnInit() {
		this.date = new FormControl(new Date(new Date().setHours(0,0,0,0)));
 		this.minDate = moment().toDate();
		this.getBookingSchedule();
	}

	/* 
		On date change, fetch room booking schedule
	*/
	dateChange(e) {
		this.date = e;
		this.getBookingSchedule();
	}

	/* 
		Using timestamp to get schedule.
			- Date and time will be handled
			- Easy enhancement to retrieve weekly & monthly schedule
	*/
	getBookingSchedule() {
		let timestamp = moment(this.date.value).unix();
		console.log('getBookingSchedule timestamp: ', timestamp);
		console.log('getBookingSchedule roomId: ', this.selectedRoom.room_id);
		this._bookingService.getBookingSchedule(timestamp, timestamp, this.selectedRoom.room_id).then((data:any) => {
			this.roomSchedule = data.response.bookings;
			console.log(data.response.bookings);
		});
	}

	bookRoom(h) {
		let hours = h.slice(0, 2);
		let mins = h.slice(2, 4);
		var duration = moment.duration({'hours' : hours});
		console.log("duration: ", duration);
		let from = moment(this.date.value).add(duration).unix();
		let to = moment(this.date.value).add(duration).add(1, 'hours').unix();
		console.log('from: ', from);
		console.log('to: ', to);
		this._bookingService.setBooking(from, to, this.selectedRoom.room_id).then((data:any) => {
			console.log(data);
		});
	}

	checkSchedule(h) {
		let result = 'available';
		this.roomSchedule.forEach(function(schedule) {
			let _startTime = moment.unix(schedule.startTime).format("HH") + '00';
			let _endTime = parseInt(moment.unix(schedule.startTime).format("HH")) + parseInt(schedule.duration) + '00';
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
