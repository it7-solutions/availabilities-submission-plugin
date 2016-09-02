import {Component} from "@angular/core";
import {MyAvailabilitiesListComponent} from "./my-availabilities-list.component";
@Component({
    selector: 'my-availabilities',
    templateUrl: 'app/templates/my-availabilities.component.html',
    directives: [
        MyAvailabilitiesListComponent
    ]
})
export class MyAvailabilities {}
