import {Injectable} from "@angular/core";
import {Headers, Http, Response, ResponseOptions, RequestOptions, URLSearchParams as ngURLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {It7ErrorService} from "./it7-error.service";
import {PluginConfig} from "./plugin.config";

class TrueQueryEncoder extends QueryEncoder {
    encodeKey(k: string): string {
        return encodeURIComponent(k);
    }
    encodeValue(v: string): string {
        return encodeURIComponent(v);
    }
}

interface It7AjaxResponse {
    error: number
    errorMessage: string
    data: any
}

@Injectable()
export class It7AjaxService {

    constructor(
        private http: Http,
        private err: It7ErrorService,
        private config: PluginConfig
    ) { }

    post(url: string, data: any): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        if(this.config.mockAJAX){return Promise.resolve(this.getMockData(url, data));}
        let here = this;
        return this.http
            .post(url, this.urlEncode(data), options)
            .toPromise()
            .then(res => this.checkResponse(res))
            .catch(function (error) {
                console.log(arguments); here.handleError('Request error: ' + error.message);
            });
    }

    private urlEncode(obj: any): string {
        let urlSearchParams = new ngURLSearchParams('', new TrueQueryEncoder());
        for (let key in obj) {
            urlSearchParams.append(key, obj[key]);
        }
        return urlSearchParams.toString();
    }

    private checkResponse(res:Response): any{
        var response = res.json();
        if(response.error){
            this.err.fire('Server request error: ' + response.errorMessage);
        }
        return res.json().data;
    }

    private handleError(error: any) {
        this.err.fire('Server connection error: ' + error);
        return Promise.reject(error.message || error);
    }

    private getMockData(url: string, data: any = undefined):any {
        console.log('getMockData', url, data);
        var m = {
            availabilities: [
                {
                    'id': 1,
                    'date': '01.02.2016',
                    'start_time': '10:00',
                    'end_time': '12:00',
                    'status': 'Available',
                    'session_name': 'Session Name 1',
                    'isDeletable': true,
                    'description': 'Description 1'
                },
                {
                    'id': 2,
                    'date': '02.02.2016',
                    'start_time': '12:00',
                    'end_time': '14:00',
                    'status': 'Confirmed',
                    'session_name': 'Session Name 2',
                    'isDeletable': false,
                    'description': 'Description 2'
                },
                {
                    'id': 3,
                    'date': '03.02.2016',
                    'start_time': '17:00',
                    'end_time': '18:00',
                    'status': 'Available',
                    'session_name': 'Session Name 3',
                    'isDeletable': true,
                    'description': ''
                },
                {
                    'id': 4,
                    'date': '04.02.2016',
                    'start_time': '14:00',
                    'end_time': '15:30',
                    'status': 'Available',
                    'session_name': 'Session Name 4',
                    'isDeletable': true,
                    'description': 'Description 4'
                }
            ]
        };
        return m;
    }
}
