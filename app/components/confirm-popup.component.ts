import {Component} from '@angular/core';
import {BasePopup, PopupService} from "../services/popup.service";
import {Availability} from "../models/availabilities";
import {It7ErrorService} from "../services/it7-error.service";
import {DataManagerService} from "../services/data-manager.service";

export class ConfirmPopup extends BasePopup {
  request:Availability;

  constructor(request:Availability) {
    super('RequestPopup');
    this.request = request;
  }
}

@Component({
  selector: 'confirm-popup',
  templateUrl: '/app/templates/confirm-popup.html'
})
export class ConfirmPopupComponent {
  popup: ConfirmPopup;
  styleLeft: string;
  styleTop: string;
  overlayWidth: string;
  overlayHeight: string;
  window: any;

  constructor(
    private err: It7ErrorService,
    private requestPopupService: PopupService,
    private dataManager: DataManagerService
  ) {
    this.window = window;
    this.requestPopupService.popup.subscribe(popup => this.checkPopup(popup));
  }

  private checkPopup(popup:BasePopup) {
    if (popup instanceof ConfirmPopup) {
      this.showPopup(popup as ConfirmPopup);
    }
  }

  private showPopup(popup: ConfirmPopup){
    if(popup.request){
      this.popup = popup;
      this.setOverlay();
      this.centerPopup();
    } else {
      this.err.fire('Error: Cannon show Confirm popup because not enough data');
    }
  }

  private setOverlay(){
    this.overlayHeight = this.window.innerHeight + "px";
    this.overlayWidth = this.window.innerWidth + "px";
  }

  private centerPopup(){
    this.styleTop = (this.window.innerHeight - 450) / 2 + "px";
    this.styleLeft = (this.window.innerWidth - 800) / 2 + "px";
  }

  private onConfirmClick() {
    this.dataManager.deleteRequest(this.popup.request.id);
    this.popup = undefined;
  }

  private onCancelClick() {
    this.popup = undefined;
  }
}
