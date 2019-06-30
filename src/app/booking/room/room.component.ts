import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
 	@Input() selectedRoom:any;
 	hours = Array(24).fill(0).map((x,i)=>i);
	constructor() {
	}

	ngOnInit() {
	}

	getHour(h) {
		return ("0000" + (h * 100)).substr(-4,4);
	}
}
