import {Component, Input} from "@angular/core";
import {Availability} from "../models/availabilities";
import {DataManagerService} from "../services/data-manager.service";
@Component({
    selector: 'my-availabilities-list-item',
    templateUrl: 'app/templates/my-availabilities-list-item.component.html'
})
export class MyAvailabilitiesListItemComponent {
    @Input() availability: Availability;
    constructor(
        private _dataManager: DataManagerService
    ) {}

    deleteAvailability(event:any) {
        event.stopPropagation();
        console.log('delete');
        this._dataManager.deleteRequest(this.availability.id);
    }

    expandCollapseClick(){
        this.availability._expanded = !this.availability._expanded;
    }

    isCollapsed: boolean = false;
}
