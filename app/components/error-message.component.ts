import {Component} from "@angular/core";
import {PluginConfig} from "../services/plugin.config";
@Component({
    selector: 'error-message',
    templateUrl: 'app/templates/error-message.component.html'
})
export class ErrorMessageComponent {
    error_message: string;
    constructor(
        private _config: PluginConfig
    ) {
        this.error_message = this._config.error_message;
    }
}
