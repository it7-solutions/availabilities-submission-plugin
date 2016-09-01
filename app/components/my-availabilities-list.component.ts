import {Component} from "@angular/core";
import {MyAvailabilitiesListItem} from "./my-availabilities-list-item.component";
@Component({
    selector: 'my-availabilities-list',
    templateUrl: 'app/templates/my-availabilities-list.component.html',
    directives: [
        MyAvailabilitiesListItem
    ]
})
export class MyAvailabilitiesList {}
