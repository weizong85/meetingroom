import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable()
export class ConfigurationManager {
	private serviceObj = environment.services;

	getServiceUrl(service) {
		let url;

		if (this.serviceObj.path[service]) {
			url = this.serviceObj.path[service] + this.serviceObj[service];
		} else if (this.serviceObj[service]){
			url = this.serviceObj[service]

		} else {
			url = service
		}

		return url;
	}

	getEnvironment() {
		return environment;
	}
}