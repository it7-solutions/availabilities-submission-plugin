import {Component} from "@angular/core";
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
    availabilities: Availability[] = [
        {
            'id': 1,
            'date': '01.02.2016',
            'time': 'Morning',
            'status': 'Available',
            'description': 'some comment',
            'isDeletable': true
        },
        {
            'id': 2,
            'date': '02.02.2016',
            'time': 'Evening',
            'status': 'Confirmed',
            'description': '',
            'isDeletable': false
        }
    ];


    constructor(
        // private availabilityService: AvailabilitiesService
    ) {
        console.log('availabilities', this.availabilities);
        // this.availabilities = availabilityService.getAvailabilities();
    }
}
