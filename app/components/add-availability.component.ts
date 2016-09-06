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
    state: Select[];
    constructor(
        private config: PluginConfig,
        private _dataManager: DataManagerService
    ) {
        this.sessionTypes = config.sessionTypes;
        this.language = config.language;
        this.state = config.state;
    }

    info: AddAvailability = {
        date: '',
        stime: '',
        etime: '',
        type_id: '',
        session_name: '',
        participants_number: null,
        language: '',
        state: '',
        location: '',
        bio: ''
    };

    addAvailability() {
        console.log(this.info);
        this._dataManager.saveRequest(this.info);

    }
}
