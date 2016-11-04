import {Component, Input} from "@angular/core";
import {Availability} from "../models/availabilities";
import {DataManagerService} from "../services/data-manager.service";
import {PopupService} from "../services/popup.service";
import {ConfirmPopup} from "./confirm-popup.component";
@Component({
    selector: 'my-availabilities-list-item',
    templateUrl: 'app/templates/my-availabilities-list-item.component.html'
})
export class MyAvailabilitiesListItemComponent {
    @Input() availability: Availability;
    constructor(
        private _dataManager: DataManagerService,
        private _requestPopupService: PopupService
    ) {}

    deleteAvailability(event:any) {
        event.stopPropagation();
        // console.log('delete');
        this._dataManager.deleteRequest(this.availability.id);
    }

    onConfirmClickConfirm(event: any){
        event.stopPropagation();
        var popup = new ConfirmPopup(this.availability);
        this._requestPopupService.showPopup(popup);
    }


    expandCollapseClick(){
        this.availability._expanded = !this.availability._expanded;
    }

    isCollapsed: boolean = false;
}
