import DependencyInjector = require('./DependencyInjector');
import AdminApi = require('../services/AdminApi');
import ResourceContainer = require('../services/ResourceContainer');
import Toaster = require('../services/Toaster');
import Modal = require('../parts/modal/Modal');
export = DependencyInjectable;

class DependencyInjectable {

	private _di : DependencyInjector;

	get di() : DependencyInjector {
		if (!this._di) return DependencyInjector.getDefault();
		return this._di;
	}

	set di(di : DependencyInjector) {
		this._di = di;
	}

	// application services getters
	
	get api() : AdminApi {
		return this.di.get('api');
	}
	
	get resources() : ResourceContainer {
		return this.di.get('resources');
	}
	
	get toaster() : Toaster {
		return this.di.get('toaster');
	}
	
	get modal() : Modal {
		return this.di.get('modal');
	}
}