import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
import {It7AjaxService} from './it7-ajax.service'
import {AvailabilitiesService} from "./availabilities.service";

@Injectable()
export class DataManagerService {
    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private it7Ajax: It7AjaxService,
        private availabilities: AvailabilitiesService
    ){}

    initData(): Promise<any> {
        //return this._getLists().then(data => this.syncData(data));
        //this.showLoading();
        return this.it7Ajax
            .post(this.config.getListsUrl, {})
            .then(data => this.syncData(data));
            // .then(data => {
            //     console.log(data);
            // });
    }

    private syncData(data: any){
        this.availabilities.setAvailabilities(data.availabilities);
    }

    saveRequest(newAvailability: Object){

        newAvailability = JSON.stringify(newAvailability);

        return this.it7Ajax
            .post(this.config.saveUrl, {newAvailability: newAvailability})
            .then(data => this.syncData(data));
    }
}
