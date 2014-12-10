define(["require", "exports", './DependencyInjector'], function (require, exports, DependencyInjector) {
    var DependencyInjectable = (function () {
        function DependencyInjectable() {
        }
        Object.defineProperty(DependencyInjectable.prototype, "di", {
            get: function () {
                if (!this._di)
                    return DependencyInjector.getDefault();
                return this._di;
            },
            set: function (di) {
                this._di = di;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyInjectable.prototype, "api", {
            // application services getters
            get: function () {
                return this.di.get('api');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyInjectable.prototype, "resources", {
            get: function () {
                return this.di.get('resources');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyInjectable.prototype, "toaster", {
            get: function () {
                return this.di.get('toaster');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyInjectable.prototype, "modal", {
            get: function () {
                return this.di.get('modal');
            },
            enumerable: true,
            configurable: true
        });
        return DependencyInjectable;
    })();
    return DependencyInjectable;
});
//# sourceMappingURL=DependencyInjectable.js.map