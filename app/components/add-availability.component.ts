import {Component, Input} from "@angular/core";
import {Select} from "../models/Select";
import {PluginConfig} from "../services/plugin.config";
import {AddAvailability} from "../models/addAvailability";
import {DataManagerService} from "../services/data-manager.service";
import {TranslationPipe} from "../pipes/translation.pipe";
@Component({
    selector: 'add-availability',
    templateUrl: 'app/templates/add-availability.component.html',
    pipes: [TranslationPipe]
})
export class AddAvailabilityComponent {
    @Input() request: AddAvailability;
    sessionTypes: Select[];
    language: Select[];
    state: string;
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
    };

    ngOnInit() {
        this.fillForm({
            state: this.config.state,
            location: this.config.location
        });
    }

    fillForm(o: any) {
        Object.assign(this.info, o);
    }

    addAvailability() {
        console.log(this.info);
        this._dataManager.saveRequest(this.info);
        this.fillForm(
            {
                date: '',
                stime: '',
                etime: '',
                type_id: '',
                session_name: '',
                participants_number: null,
                language: '',
            }
        );
    }
}
