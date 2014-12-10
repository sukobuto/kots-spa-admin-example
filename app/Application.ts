/// <reference path="references.d.ts" />
import DependencyInjector = require('di/DependencyInjector');
import Injectable = require('di/DependencyInjectable');
import Shell = require('./Shell');
import AdminApi = require('services/AdminApi');
import Toaster = require('services/Toaster');
import ResourceContainer = require('services/ResourceContainer');
import Modal = require('parts/Modal');
export=Application;

class Application extends Injectable {
	
	public shell : Shell = null;
	
	constructor() {
		super();
		ko.track(this);
	}
	
	public initialize() {
		var di = this.declareServices();
		this.api.init().then((res) => {
			ko.track(res.user);
			di.set('resources', new ResourceContainer(res.user, res.config));
			var shell = new Shell();
			this.shell = shell.initialize();
			shell.load();
		});
	}
	
	public declareServices() : DependencyInjector {
		var di = DependencyInjector.factoryDefault();
		di.set('api', () => new AdminApi() , true);
		di.set('toaster', () => new Toaster(), true);
		di.set('modal', () => new Modal(), true);
		return di;
	}
}

KnockoutElse.init();  // knockout-else    : https://github.com/brianmhunt/knockout-else
ko.punches.enableAll(); // knockout-punches : https://github.com/mbest/knockout.punches

$(() => {
	var app = new Application();
	window['app'] = app; //for Console Debug.
	ko.applyBindings(app);
	app.initialize();
});
