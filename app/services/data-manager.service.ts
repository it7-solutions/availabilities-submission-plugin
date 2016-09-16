import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
import {It7AjaxService} from './it7-ajax.service'
import {AvailabilitiesService} from "./availabilities.service";
import {BusyPopup} from "../components/busy-popup.component";
import {PopupService} from "./popup.service";

@Injectable()
export class DataManagerService {
    private popup: BusyPopup;
    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private it7Ajax: It7AjaxService,
        private availabilities: AvailabilitiesService,
        private popupService:PopupService
    ){}

    initData(): Promise<any> {
        return this.it7Ajax
            .post(this.config.getListsUrl, {})
            .then(data => this.syncData(data));
    }

    private syncData(data: any){
        this.availabilities.setAvailabilities(data.availabilities);
        this.hideLoading();
    }

    saveRequest(newAvailability: Object){

        newAvailability = JSON.stringify(newAvailability);
        console.log('new data', newAvailability);
        return this.it7Ajax
            .post(this.config.saveUrl, {newAvailability: newAvailability})
            .then(data => this.syncData(data));
    }

    deleteRequest(id: number){
        this.showLoading();
        return this.it7Ajax
            .post(this.config.deleteUrl, {id: id})
            .then(data => this.syncData(data));
    }

    private showLoading(){
        console.log('show loading');
        this.popup = new BusyPopup();
        this.popupService.showPopup(this.popup);
    }

    private hideLoading(){
        if(this.popup){
            this.popup.visible = false;
            this.popupService.showPopup(this.popup);
            this.popup = undefined;
        }
    }
}
