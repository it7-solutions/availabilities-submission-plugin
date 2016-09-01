import {Component} from "@angular/core";
import {AddAvailability} from "./add-availability.component";
import {MyAvailabilities} from "./my-availabilities.component";
import {PluginConfig} from "../services/plugin.config";
@Component({
    selector: 'it7-availabilities-submission-plugin',
    templateUrl: 'app/templates/plugin.component.html',
    directives: [
        AddAvailability,
        MyAvailabilities
    ]
})
export class PluginComponent {
    constructor(private config: PluginConfig) {
        console.log(config);
    }
}
