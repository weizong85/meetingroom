import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigurationManager } from './configuration-manager';
import { environment } from './../environments/environment';


@Injectable()
export class HttpServices {
	successCode: Array<any> = [200];
	constructor(private _configurationManager: ConfigurationManager, private _http: HttpClient, private _router: Router) {

	}

	fetch(url: string, requestPayload: any = {}, method: string = '') {
		url = this._configurationManager.getServiceUrl(url);
		let defaultMethod = environment.production ? 'POST' : 'GET'; //user GET if in dev
		defaultMethod = (method === '') ? defaultMethod : method.toUpperCase(); //method override

		switch (defaultMethod) {
			case 'POST':
				return this._http.post(url, requestPayload).toPromise()
				.then(resp => {
					return this.responseData(resp);
				})
				.catch(resp => {
					return this.handleError(resp);
				})
			case 'GET':
			default:
				let params = new HttpParams();
				if(!_.isEmpty(requestPayload)) {
					_.each(requestPayload, (obj, key) => {
						params.append(obj, key);
					});
				}
				return this._http.get(url).toPromise()
				.then(resp => {
					return this.responseData(resp);
				})
				.catch(resp => {
					return this.handleError(resp);
				})
		}
	}

	responseData(resp) {
		if(resp) {
			if(resp.status.code !== 200) {
				console.log("Server Error!",resp);
			}
			else {
				if(this.successCode.indexOf(resp.status.code) < 0) {
					return Promise.reject(resp);
				}
				return Promise.resolve(resp);
			}
		}
	}

	handleError(resp) {
		let _self = this;
		if(resp.status !== 200) {
			console.log("Connection Error!", resp); 
		}
		else {
			return Promise.reject(resp);
		}
	}
}