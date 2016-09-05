import {Component, Input} from "@angular/core";
import {Select} from "../models/Select";
import {PluginConfig} from "../services/plugin.config";
import {AddAvailability} from "../models/addAvailability";
import {DataManagerService} from "../services/data-manager.service";
@Component({
    selector: 'add-availability',
    templateUrl: 'app/templates/add-availability.component.html'
})
export class AddAvailabilityComponent {
    @Input() request: AddAvailability;
    sessionTypes: Select[];
    language: Select[];
    canton: Select[];
    constructor(
        private config: PluginConfig,
        private _dataManager: DataManagerService
    ) {
        this.sessionTypes = config.sessionTypes;
        this.language = config.language;
        this.canton = config.canton;
    }

    info: AddAvailability = {
        date: '',
        stime: '',
        etime: '',
        session_type: '',
        session_name: '',
        participants_number: null,
        language: '',
        canton: '',
        room: '',
        bio: ''
    };

    addAvailability() {
        console.log(this.info);
        this._dataManager.saveRequest(this.info);

    }
}
