define(["require", "exports"], function (require, exports) {
    var DependencyInjector = (function () {
        function DependencyInjector() {
            this.services = {};
            this.shared_instances = {};
        }
        DependencyInjector.getDefault = function () {
            return this._default;
        };
        DependencyInjector.setDefault = function (_default) {
            this._default = _default;
        };
        DependencyInjector.factoryDefault = function () {
            return this._default = new DependencyInjector();
        };
        DependencyInjector.prototype.set = function (name, service, shared) {
            this.services[name] = service;
            service._shared = shared || false;
            return this;
        };
        DependencyInjector.prototype.get = function (name, shared) {
            if (!this.services.hasOwnProperty(name)) {
                throw Error('Service' + name + ' not found.');
            }
            var service = this.services[name];
            if (typeof service == 'function') {
                if (service._shared || shared) {
                    if (this.shared_instances.hasOwnProperty(name)) {
                        return this.shared_instances[name];
                    }
                    else {
                        return this.shared_instances[name] = service();
                    }
                }
                else {
                    return service();
                }
            }
            else {
                return service;
            }
        };
        return DependencyInjector;
    })();
    return DependencyInjector;
});
//# sourceMappingURL=DependencyInjector.js.map