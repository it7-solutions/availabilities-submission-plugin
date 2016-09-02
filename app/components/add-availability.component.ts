import {Component} from "@angular/core";
import {Select} from "../models/Select";
import {PluginConfig} from "../services/plugin.config";
@Component({
    selector: 'add-availability',
    templateUrl: 'app/templates/add-availability.component.html'
})
export class AddAvailabilityComponent {
    // @Input() options: Select;
    sessionTypes: Select[];
    language: Select[];
    canton: Select[];
    constructor(private config: PluginConfig) {
        this.sessionTypes = config.sessionTypes;
        this.language = config.language;
        this.canton = config.canton;
    }
}
