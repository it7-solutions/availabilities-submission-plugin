import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Availability} from "../models/availabilities";

@Injectable()
export class AvailabilitiesService {
    private availabilities: Availability[];
    private _onUpdate: BehaviorSubject<Availability[]>;
    public onUpdate: Observable<Availability[]>;

    constructor() {
        this.availabilities = [];
        this._onUpdate = new BehaviorSubject([]);
        this.onUpdate = this._onUpdate.asObservable();
    }

    setAvailabilities(availabilities: Availability[]) {
        this.availabilities = this.syncExpanded(availabilities);
        this._onUpdate.next(this.availabilities);

        // console.log(availabilities);
    }

    getAvailabilities(): Availability[] {
        return this.availabilities;
    }

    private syncExpanded(availabilities: Availability[]): Availability[] {
        _.each(availabilities, (availability: Availability) => {
            let found: Availability[] = _.where(this.availabilities, {id: availability.id});
            if (found.length) {
                availability._expanded = found[0]._expanded;
            }
        });
        return availabilities;
    }
}
