import {Injectable} from "@angular/core";
import {Select} from "../models/Select";

export interface PluginOptions {
    templatesBaseUrl?: string;
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX?: boolean;
    minDate: string;
    maxDate: string;
    sessionTypes: Select[];
    language: Select[];
    canton: Select[];
}

@Injectable()
export class PluginConfig {
    templatesBaseUrl: string;
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX: boolean;
    minDate: string;
    maxDate: string;
    sessionTypes: Select[];
    language: Select[];
    canton: Select[];

    constructor(options:PluginOptions) {
        this.templatesBaseUrl = options.templatesBaseUrl;
        this.getListsUrl = options.getListsUrl;
        this.saveUrl = options.saveUrl;
        this.deleteUrl = options.deleteUrl;
        this.mockAJAX = options.mockAJAX;
        this.minDate = options.minDate;
        this.maxDate = options.maxDate;
        this.sessionTypes = options.sessionTypes;
        this.language = options.language;
        this.canton = options.canton;
    }
}
