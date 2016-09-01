import {Component} from "@angular/core";
import {AddAvailability} from "./add-availability.component";
import {MyAvailabilities} from "./my-availabilities.component";
import {MyAvailabilitiesList} from "./my-availabilities-list.component";
import {MyAvailabilitiesListItem} from "./my-availabilities-list-item.component";
@Component({
    selector: 'it7-availabilities-submission-plugin',
    templateUrl: 'app/templates/plugin.component.html',
    directives: [
        AddAvailability,
        MyAvailabilities
    ]
})
export class PluginComponent {}
