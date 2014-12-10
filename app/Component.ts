/// <reference path="references.d.ts" />
import Injectable = require('di/DependencyInjectable');
export = Component;

class Component extends Injectable {
	
	public componentId:string;
	
	public static register(name : string, klass, template) {
		ko.components.register(name, {
			template: template,
			viewModel: {
				createViewModel(params, componentInfo) {
					return params instanceof klass
						? params
						: ko.unwrap(params.option);
				}
			}
		})
	}
	
}
