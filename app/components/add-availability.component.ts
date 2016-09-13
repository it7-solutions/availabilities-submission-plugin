import {Component, Input} from "@angular/core";
import {Select} from "../models/Select";
import {PluginConfig} from "../services/plugin.config";
import {AddAvailability} from "../models/addAvailability";
import {DataManagerService} from "../services/data-manager.service";
import {TranslationPipe} from "../pipes/translation.pipe";
import {ValidateField} from "../models/validate";
import {TranslationsService} from "../services/translations.service";
@Component({
    selector: 'add-availability',
    templateUrl: 'app/templates/add-availability.component.html',
    pipes: [TranslationPipe]
})
export class AddAvailabilityComponent {
    @Input() request: AddAvailability;
    sessionTypes: Select[];
    language: Select[];
    state: string;
    formValid: boolean = true;
    constructor(
        private config: PluginConfig,
        private _dataManager: DataManagerService,
        private _translate: TranslationsService
    ) {
        this.sessionTypes = config.sessionTypes;
        this.language = config.language;
        this.state = config.state;
    }

    info: AddAvailability = {
        date: '',
        stime: '',
        etime: '',
        type_id: '',
        session_name: '',
        participants_number: null,
        language: '',
        state: '',
        location: '',
    };

    validateFields: {[key:string] : ValidateField} = {
        date: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        stime: {
            isValid: true,
            messageText: '',
            isRequired: true,
            isTime: true,
            etime_lower: true
        },
        etime: {
            isValid: true,
            messageText: '',
            isRequired: true,
            isTime: true,
            etime_greater: true
        },
        type_id: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        session_name: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        participants_number: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        language: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        state: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        location: {
            isValid: true,
            messageText: '',
            isRequired: true,
        }
    };

    private setAllValid() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            field.isValid = true;
            field.messageText = '';
        }
    }

    checkRequired() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            if(field.isRequired) {
                var value = this.info[fieldName];
                if('' === value || value === null) {
                    field.isValid = false;
                    field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('Please fill in the form!');
                }
            }
        }
    }

    checkTime() {
        for(var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if(field.isTime) {
                var value = this.info[fieldName];
                // /^(0[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/i.test(value) - American
                if(!/^([0-1][0-9]|2[0-3]):([0-4][0-9]|5[0-9])$/i.test(value)) {
                    field.isValid = false;
                    field.messageText = (field.messageText ? field.messageText + '. ' : '') + 'Time must be in 24-hour format!';
                }
            }
        }
    }

    checkEndTimeGreaterThanStart() {
        for(var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if(field.isTime) {
                if(this.info.stime > this.info.etime) {
                    if(field.etime_lower) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + 'Start time must be lower that End time!';
                    } else if(field.etime_greater) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + 'End time must be greater that Start time!';
                    }
                }
            }
        }

    }

    checkValid() {
        this.formValid = true;
        for(var i in this.validateFields) {
            if(this.validateFields[i].isValid === false) {
                this.formValid = false;
                break;
            }
        }
        return this.formValid;
    }



    onValidateFields() {
        this.setAllValid();
        this.checkRequired();
        this.checkTime();
        this.checkEndTimeGreaterThanStart();

        this.checkValid();
    }

    ngOnInit() {
        this.fillForm({
            state: this.config.state,
            location: this.config.location
        });
    }

    fillForm(o: any) {
        Object.assign(this.info, o);
    }

    addAvailability() {
        this.onValidateFields();
        console.log('form', this.formValid);
        if(this.checkValid()) {
            console.log('saving');
            this._dataManager.saveRequest(this.info);

            this.fillForm(
                {
                    date: '',
                    stime: '',
                    etime: '',
                    type_id: '',
                    session_name: '',
                    participants_number: null,
                    language: '',
                }
            );
        }



    }

    onShowDate() {
        this.config.onDate(this.info.date, (date: string) => {
            this.info.date = date;
        });
    }
}
