///<reference path="../typings/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {PluginComponent} from "./components/plugin.component";

setTimeout(function () {
    bootstrap(PluginComponent);
}, 1);

