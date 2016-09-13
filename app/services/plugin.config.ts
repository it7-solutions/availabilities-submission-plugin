import {Injectable} from "@angular/core";
import {Select} from "../models/Select";

export interface PluginOptions {
    templatesBaseUrl?: string;
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX?: boolean;
    sessionTypes: Select[];
    language: Select[];
    state: string;
    location: string;
    time_format: string;
    time_format_regex: string;
    onTranslate?: (code:string, text: string) => any;
    translations: any[];
    onDate?: (date: string, callback: any) => any;
}

@Injectable()
export class PluginConfig {
    templatesBaseUrl: string;
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX: boolean;
    sessionTypes: Select[];
    language: Select[];
    state: string;
    location: string;
    time_format: string;
    time_format_regex: string;
    onTranslate: (code:string, text: string) => any;
    translations: any[];
    onDate: (date: string, callback: any) => any;

    constructor(options:PluginOptions) {
        this.templatesBaseUrl = options.templatesBaseUrl;
        this.getListsUrl = options.getListsUrl;
        this.saveUrl = options.saveUrl;
        this.deleteUrl = options.deleteUrl;
        this.mockAJAX = options.mockAJAX;
        this.sessionTypes = options.sessionTypes;
        this.language = options.language;
        this.state = options.state;
        this.location = options.location;
        this.time_format = options.time_format;
        this.time_format_regex = options.time_format_regex;
        this.onTranslate = typeof options.onTranslate === 'function' ? options.onTranslate : () => {};
        this.translations = options.translations;
        this.onDate = typeof options.onDate === 'function' ? options.onDate : () => {};
    }
}
