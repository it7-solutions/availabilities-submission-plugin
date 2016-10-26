import {Injectable} from "@angular/core";
import {Select} from "../models/Select";
import {UploadAdaptor} from "../models/upload-file-adaptor"

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
    time_format_moment_js: string;
    error_message: string;
    onTranslate?: (code:string, text: string) => any;
    translations: any[];
    onInit?: (callback: any) => any;
    uploader?: UploadAdaptor;
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
    time_format_moment_js: string;
    error_message: string = '';
    onTranslate: (code:string, text: string) => any;
    translations: any[];
    onInit: (callback: any) => any;
    uploader: UploadAdaptor;

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
        this.time_format_moment_js = options.time_format_moment_js;
        undefined !== options.error_message && (this.error_message = options.error_message);
        this.onTranslate = typeof options.onTranslate === 'function' ? options.onTranslate : () => {};
        this.translations = options.translations;
        this.onInit = typeof options.onInit === 'function' ? options.onInit : () => {};
        undefined !== options.uploader && (this.uploader = options.uploader);
    }
}
