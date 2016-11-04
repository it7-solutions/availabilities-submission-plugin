import {Component, OnInit, enableProdMode} from "@angular/core";
import {AddAvailabilityComponent} from "./add-availability.component";
import {MyAvailabilities} from "./my-availabilities.component";
import {PluginConfig} from "../services/plugin.config";
import {DataManagerService} from "../services/data-manager.service";
import {It7ErrorService} from "../services/it7-error.service";
import {It7AjaxService} from "../services/it7-ajax.service";
import {AvailabilitiesService} from "../services/availabilities.service";
import {TranslationsService} from "../services/translations.service";
import { PopupService } from '../services/popup.service';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { BusyPopupComponent } from './busy-popup.component';
import {ErrorMessageComponent} from "./error-message.component";
enableProdMode();
@Component({
    selector: 'it7-availabilities-submission-plugin',
    templateUrl: 'app/templates/plugin.component.html',
    directives: [
        AddAvailabilityComponent,
        MyAvailabilities,
        ConfirmPopupComponent,
        BusyPopupComponent,
        ErrorMessageComponent
    ],
    providers: [
        DataManagerService,
        It7ErrorService,
        It7AjaxService,
        AvailabilitiesService,
        TranslationsService,
        PopupService
    ]
})
export class PluginComponent implements OnInit{
    error_message: string;
    constructor(
        private config: PluginConfig,
        private dataManager: DataManagerService
    ) {
        // console.log(config);
        this.error_message = this.config.error_message;
    }

    getItems() {
        //init plugin
        this.dataManager.initData();
    }

    showMessageError() { // check if all options exist
        if(this.error_message === "" || this.error_message === null) {
            return false;
        } else {
            return true;
        }
    }

    ngOnInit() {
        this.getItems();
    }
}
