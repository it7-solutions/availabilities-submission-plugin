import {Component, Input} from "@angular/core";
import {Availability} from "../models/availabilities";
@Component({
    selector: 'my-availabilities-list-item',
    templateUrl: 'app/templates/my-availabilities-list-item.component.html'
})
export class MyAvailabilitiesListItemComponent {
    @Input() availability: Availability;
}
