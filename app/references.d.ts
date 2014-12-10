/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings_manually/tsd.d.ts" />
/// <reference path="page/Page.ts" />
/// <reference path="di/DependencyInjector.ts" />
/// <reference path="di/DependencyInjectable.ts" />

interface KnockoutStatic{
	punches:any;
}
declare var KnockoutElse:{
	init:any;
};

interface JQuery {
	upload(url:string, data:any, callback:(any)=>void, type:string);
}

interface ToasterParameter {
	priority: string;
	title: string;
	message: string;
}

interface JQueryStatic {
	toaster(ToasterParameter);
}

interface Administrator {
    id?: number;
    login: string;
    name: string;
    email: string;
    enabled: boolean;
    clearances: string[];
    is_master: boolean;
}
