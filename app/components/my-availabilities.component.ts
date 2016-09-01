import {Component} from "@angular/core";
import {MyAvailabilitiesList} from "./my-availabilities-list.component";
@Component({
    selector: 'my-availabilities',
    templateUrl: 'app/templates/my-availabilities.component.html',
    directives: [
        MyAvailabilitiesList
    ]
})
export class MyAvailabilities {}
