import {Component, Input, EventEmitter, ViewChild} from "@angular/core";
import {Select} from "../models/Select";
import {PluginConfig} from "../services/plugin.config";
import {AddAvailability} from "../models/addAvailability";
import {DataManagerService} from "../services/data-manager.service";
import {TranslationPipe} from "../pipes/translation.pipe";
import {ValidateField} from "../models/validate";
import {TranslationsService} from "../services/translations.service";
import {UploadedResult} from '../models/upload-file-adaptor';
import * as moment from 'moment';


@Component({
    selector: 'add-availability',
    templateUrl: 'app/templates/add-availability.component.html',
    pipes: [TranslationPipe]
})
export class AddAvailabilityComponent {
    @Input() request: AddAvailability;
    @ViewChild('stime') startTimeInput: any;
    @ViewChild('etime') endTimeInput: any;
    @ViewChild('datepicker') datepickerInput: any;
    sessionTypes: Select[];
    language: Select[];
    state: string;
    formValid: boolean = true;
    fileProgress:number = undefined;
    fileError:string = '';
    fileName:string = '';


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
        min_participants_number: null,
        language: '',
        state: '',
        location: '',
        description: '',
        file: ''
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
        min_participants_number: {
            isValid: true,
            messageText: '',
            isRequired: true,
            isNumber: true,
            number_lower: true,
        },
        participants_number: {
            isValid: true,
            messageText: '',
            isRequired: true,
            isNumber: true,
            number_greater: true,
        },
        language: {
            isValid: true,
            messageText: '',
            isRequired: true,
        },
        state: {
            isValid: true,
            messageText: '',
            isRequired: false,
        },
        location: {
            isValid: true,
            messageText: '',
            isRequired: false,
        },
        description: {
            isValid: true,
            messageText: '',
            isRequired: false,
        }
    };

    private setAllValid() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            field.isValid = true;
            field.messageText = '';
        }
    }

    private checkRequired() {
        for(var fieldName in this.validateFields) {
            var field:ValidateField = this.validateFields[fieldName];
            if(field.isRequired) {
                var value = this.info[fieldName];
                if('' === value || value === null) {
                    field.isValid = false;
                    field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('Please fill in the form');
                }
            }
        }
    }

    private checkTime() {
        for(var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if(field.isTime) {
                var value = this.info[fieldName];
                // /^(0[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/i.test(value) - American
                var regExp = new RegExp(this.config.time_format_regex, 'i');
                if(this.config.time_format === 'us') {
                    this.setTimeFieldDisabled(this._translate.translate('Enter time in format: HH:MM am/pm'), regExp, field, value);
                } else if(this.config.time_format === 'eu') {
                    this.setTimeFieldDisabled(this._translate.translate('Enter time in format: HH:MM'), regExp, field, value);
                }
            }
        }
    }

    private setTimeFieldDisabled(textMessage: any, regExp: RegExp, field: ValidateField, value: any) {
        if(!regExp.test(value)) {
            field.isValid = false;
            field.messageText = (field.messageText ? field.messageText + '. ' : '') + textMessage;
        }
    }

    private checkEndTimeGreaterThanStart() {
        var startStamp:any = this.convertDateToTimeStamp(this.info.stime);
        var endStamp:any = this.convertDateToTimeStamp(this.info.etime);
        for (var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if (field.isTime) {
                if (startStamp >= endStamp) {
                    if (field.etime_lower) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('Start time must be lower than End time');
                    } else if (field.etime_greater) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('End time must be greater than Start time');
                    }
                }
            }
        }
    }

    private checkMaxNumberGreaterThanMin() {
        var minNumber = this.info.min_participants_number;
        var maxNumber = this.info.participants_number;
        for (var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if (field.isNumber) {
                if (Number(minNumber) > Number(maxNumber)) {
                    if (field.number_lower) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('Min number must be lower than Max number');
                    } else if(field.number_greater) {
                        field.isValid = false;
                        field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('Max number must be greater than Min number');
                    }
                }
            }
        }
    }

    private convertDateToTimeStamp(time: any) {
        var date: string = '';
        if(this.config.time_format === 'us') {
            date = '09/14/2016';
        } else if(this.config.time_format === 'eu') {
            date = '14.09.2016';
        }
        var mm = moment(date + ' ' + time, this.config.time_format_moment_js);
        return mm.valueOf();
    };

    private isNumber() {
        for(var fieldName in this.validateFields) {
            var field = this.validateFields[fieldName];
            if(field.isNumber) {
                var value = this.info[fieldName];
                var regExp = new RegExp('^[1-9][0-9]*$', 'i');
                if(!regExp.test(value)) {
                    field.isValid = false;
                    field.messageText = (field.messageText ? field.messageText + '. ' : '') + this._translate.translate('The field must be a number');
                }
            }
        }
    }

    private checkValid() {
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
        this.isNumber();
        this.checkMaxNumberGreaterThanMin();

        this.checkValid();
    }

    ngOnInit() {
        this.fillForm({
            state: this.config.state,
            location: this.config.location
        });

        // init datapicker
        this.config.onInit((date: string) => {
            this.info.date = date;
        });

        // Init fileUploader
        if (this.config.uploader && 'function' === typeof this.config.uploader.onInit) {
            this.config.uploader.onInit({
                onProgress: (p: number) => this.onFileProgress(p),
                onUploaded: (r: UploadedResult) => this.onFileUploaded(r),
                onError: (r: UploadedResult) => this.onFileError(r)
            });
        }
    }

    fillForm(o: any) {
        Object.assign(this.info, o);
    }

    private addValuesFromInputs() {
        this.info.date = this.datepickerInput.nativeElement.value;
        this.info.stime = this.startTimeInput.nativeElement.value;
        this.info.etime = this.endTimeInput.nativeElement.value;
    }

    private clearValues() {
        this.datepickerInput.nativeElement.value = '';
        this.startTimeInput.nativeElement.value = '';
        this.endTimeInput.nativeElement.value = '';
    }

    addAvailability() {
        this.addValuesFromInputs();
        this.onValidateFields();
        // console.log('form', this.formValid);
        if(this.checkValid()) {
            this.clearValues();
            // console.log('saving...');
            this._dataManager.saveRequest(this.info);

            this.fillForm(
                {
                    date: '',
                    stime: '',
                    etime: '',
                    type_id: '',
                    session_name: '',
                    participants_number: null,
                    min_participants_number: null,
                    language: '',
                    description: '',
                    file: ''
                }
            );
        }
    }

    // File upload field

    private onFileProgress(progress: number): void {
        this.info.file = '';
        this.fileProgress = progress;
        this.fileError = '';
    }

    private onFileUploaded(result: UploadedResult): void {
        // console.log('onFileUploaded', result);
        if('ok' === result.status){
            this.info.file = result.file;
            this.fileProgress = undefined;
            this.fileError = '';
            this.fileName = result.originalName ? result.originalName : result.file;
        }
    }

    private onFileError(result: UploadedResult): void {
        // console.log('onFileError', result);
        this.info.file = '';
        this.fileProgress = undefined;
        this.fileError = result.msg || 'Unknown upload error';
    }

    // Call from Template
    public onRemoveFileClick(): void {
        this.info.file = '';
        this.fileProgress = undefined;
    }
}
