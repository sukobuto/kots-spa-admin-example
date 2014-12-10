
export = DependencyInjector;

class DependencyInjector {

	private static _default : DependencyInjector;

	public static getDefault() : DependencyInjector {
		return this._default;
	}

	public static setDefault(_default : DependencyInjector) {
		this._default = _default;
	}

	public static factoryDefault() : DependencyInjector {
		return this._default = new DependencyInjector();
	}

	private services : { [index:string]:any } = {};
	private shared_instances : { [index:string]:any } = {};

	public set(name : string, service : any, shared? : boolean) : DependencyInjector {
		this.services[name] = service;
		service._shared = shared || false;
		return this;
	}

	public get(name : string, shared? : boolean) : any {
		if (!this.services.hasOwnProperty(name)) {
			throw Error('Service' + name + ' not found.');
		}
		var service = this.services[name];
		if (typeof service == 'function') {
			if (service._shared || shared) {
				if (this.shared_instances.hasOwnProperty(name)) {
					return this.shared_instances[name];
				} else {
					return this.shared_instances[name] = service();
				}
			} else {
				return service();
			}
		} else {
			return service;
		}
	}
}