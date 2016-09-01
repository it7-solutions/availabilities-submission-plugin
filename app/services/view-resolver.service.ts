import { ViewMetadata, Type, Inject} from '@angular/core';
import { ViewResolver } from '@angular/compiler';

export class ViewResolverService extends ViewResolver{

    resolve(component: Type): ViewMetadata {
        var view =  super.resolve(component);
        var basePath = window && window['__it7_availabilities_submission_plugin__'];
        if(basePath && basePath.length && view.templateUrl){
            view.templateUrl = basePath.replace(/\/$/gm,'') + '/' + view.templateUrl.replace(/^\//gm,'');
        }
        return view;
    }
}
