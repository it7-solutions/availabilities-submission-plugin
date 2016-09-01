import {Component, Input} from "@angular/core";
import {MyAvailabilitiesListItem} from "./my-availabilities-list-item.component";
import {Availability} from "../models/availabilities";
import {AvailabilitiesService} from "../services/availabilities.service";
@Component({
    selector: 'my-availabilities-list',
    templateUrl: 'app/templates/my-availabilities-list.component.html',
    directives: [
        MyAvailabilitiesListItem
    ]
})
export class MyAvailabilitiesList {
    @Input() list: Availability[];

    constructor(private availabilities: AvailabilitiesService) {
    }

    ngOnInit() {
        this.availabilities.onUpdate.subscribe(availabilities => this.updateList(availabilities));
    }

    // Call from this class closure
    updateList(availabilities: Availability[]){
        this.list = availabilities;
    }
}
