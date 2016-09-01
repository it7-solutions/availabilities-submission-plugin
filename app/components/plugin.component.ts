import {Component, OnInit} from "@angular/core";
import {AddAvailability} from "./add-availability.component";
import {MyAvailabilities} from "./my-availabilities.component";
import {PluginConfig} from "../services/plugin.config";
import {DataManagerService} from "../services/data-manager.service";
import {It7ErrorService} from "../services/it7-error.service";
import {It7AjaxService} from "../services/it7-ajax.service";
import {AvailabilitiesService} from "../services/availabilities.service";
@Component({
    selector: 'it7-availabilities-submission-plugin',
    templateUrl: 'app/templates/plugin.component.html',
    directives: [
        AddAvailability,
        MyAvailabilities
    ],
    providers: [
        DataManagerService,
        It7ErrorService,
        It7AjaxService,
        AvailabilitiesService
    ]
})
export class PluginComponent implements OnInit{
    constructor(
        private config: PluginConfig,
        private dataManager: DataManagerService
    ) {
        console.log(config);
    }

    getItems() {
        //init plugin
        this.dataManager.initData();
    }

    ngOnInit() {
        this.getItems();
    }
}
