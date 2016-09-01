import {Injectable} from "@angular/core";

export interface PluginOptions {
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX?: boolean;
    templatesBaseUrl?: string;
}

@Injectable()
export class PluginConfig {
    getListsUrl: string;
    saveUrl: string;
    deleteUrl: string;
    mockAJAX: boolean;
    templatesBaseUrl: string;

    constructor(options:PluginOptions) {
        this.getListsUrl = options.getListsUrl;
        this.saveUrl = options.saveUrl;
        this.deleteUrl = options.deleteUrl;
        this.mockAJAX = options.mockAJAX;
        this.templatesBaseUrl = options.templatesBaseUrl;
    }
}
