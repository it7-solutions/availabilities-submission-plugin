import {Component, Input} from "@angular/core";
import {Availability} from "../models/availabilities";
import {DataManagerService} from "../services/data-manager.service";
import {AddAvailability} from "../models/addAvailability";
@Component({
    selector: 'my-availabilities-list-item',
    templateUrl: 'app/templates/my-availabilities-list-item.component.html'
})
export class MyAvailabilitiesListItemComponent {
    @Input() availability: Availability;
    constructor(
        private _dataManager: DataManagerService
    ) {}

    deleteAvailability() {
        console.log('delete');
        this._dataManager.deleteRequest(this.availability.id);
    }
}
