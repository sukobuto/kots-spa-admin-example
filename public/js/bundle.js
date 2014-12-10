/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, DependencyInjector, Injectable, Shell, AdminApi, Toaster, ResourceContainer, Modal) {
	    var Application = (function (_super) {
	        __extends(Application, _super);
	        function Application() {
	            _super.call(this);
	            this.shell = null;
	            ko.track(this);
	        }
	        Application.prototype.initialize = function () {
	            var _this = this;
	            var di = this.declareServices();
	            this.api.init().then(function (res) {
	                ko.track(res.user);
	                di.set('resources', new ResourceContainer(res.user, res.config));
	                var shell = new Shell();
	                _this.shell = shell.initialize();
	                shell.load();
	            });
	        };
	        Application.prototype.declareServices = function () {
	            var di = DependencyInjector.factoryDefault();
	            di.set('api', function () { return new AdminApi(); }, true);
	            di.set('toaster', function () { return new Toaster(); }, true);
	            di.set('modal', function () { return new Modal(); }, true);
	            return di;
	        };
	        return Application;
	    })(Injectable);
	    KnockoutElse.init(); // knockout-else    : https://github.com/brianmhunt/knockout-else
	    ko.punches.enableAll(); // knockout-punches : https://github.com/mbest/knockout.punches
	    $(function () {
	        var app = new Application();
	        window['app'] = app; //for Console Debug.
	        ko.applyBindings(app);
	        app.initialize();
	    });
	    return Application;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Application.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3), __webpack_require__(9), __webpack_require__(10), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Injectable, SideNav, HeaderNav, MenuItem) {
	    var Shell = (function (_super) {
	        __extends(Shell, _super);
	        function Shell() {
	            _super.call(this);
	            this.sideNav = null;
	            this.routeMap = null;
	            this.page = null;
	            this.menuId = null;
	            this.modal = this.modal;
	            ko.track(this);
	        }
	        Shell.prototype.initialize = function () {
	            var _this = this;
	            var routes = this.declareRoutes();
	            this.routeMap = Enumerable.from(routes).toObject(function (r) { return r.name; }, function (r) { return r; });
	            this.sideNav = new SideNav(Enumerable.from(routes).where(function (r) { return r.nav != null && _this.userHasClearanceOf(r.name); }).select(function (r) { return new MenuItem(r.name, r.path, r.nav.label, r.nav.icon); }).toArray());
	            routie(Enumerable.from(routes).where(function (r) { return r.nav == null || _this.userHasClearanceOf(r.name); }).toObject(function (r) { return r.path; }, function (r) { return r.handler; }));
	            this.headerNav = new HeaderNav();
	            return this;
	        };
	        Shell.prototype.userHasClearanceOf = function (identifier) {
	            if (identifier === 'home')
	                return true; // home は無条件で許可
	            if (this.resources.user.is_master)
	                return true;
	            return this.resources.user.clearances.indexOf(identifier) >= 0;
	        };
	        Shell.prototype.load = function () {
	            var fixSize = function () {
	                var topOffset = 50;
	                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	                if (width < 768) {
	                    $('div.navbar-collapse').addClass('collapse');
	                    topOffset = 100; // 2-row-menu
	                }
	                else {
	                    $('div.navbar-collapse').removeClass('collapse');
	                }
	                var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	                height = height - topOffset;
	                if (height < 1)
	                    height = 1;
	                if (height > topOffset) {
	                    $("#page-wrapper").css("min-height", (height) + "px");
	                }
	            };
	            fixSize();
	            $(window).on('resize', fixSize);
	            routie(window.location.hash);
	        };
	        Shell.prototype.transit = function (name, context) {
	            this.page = this.routeMap[name].page();
	            this.page.load(context);
	            this.menuId = name;
	            setTimeout(function () {
	                $('#page-wrapper > .row').addClass('active');
	            }, 100);
	        };
	        Shell.prototype.declareRoutes = function () {
	            var _this = this;
	            return [
	                {
	                    name: 'home',
	                    page: __webpack_require__(13).factory,
	                    nav: { label: 'Home', icon: 'folder' },
	                    path: '',
	                    handler: function () { return _this.transit('home', {}); }
	                },
	                {
	                    name: 'settings',
	                    page: __webpack_require__(14).factory,
	                    path: 'settings',
	                    handler: function () { return _this.transit('settings', {}); }
	                },
	                {
	                    name: 'user',
	                    page: __webpack_require__(15).factory,
	                    path: 'user',
	                    handler: function () { return _this.transit('user', {}); }
	                },
	                {
	                    name: 'contact',
	                    page: __webpack_require__(33).factory,
	                    nav: { label: 'Contact', icon: 'envelope' },
	                    path: 'contact',
	                    handler: function () { return _this.transit('contact', {}); }
	                },
	            ];
	        };
	        return Shell;
	    })(Injectable);
	    return Shell;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Shell.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=DependencyInjector.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, DependencyInjector) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=DependencyInjectable.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ApiBase) {
	    var AdminApi = (function (_super) {
	        __extends(AdminApi, _super);
	        function AdminApi() {
	            _super.apply(this, arguments);
	        }
	        AdminApi.prototype.init = function () {
	            return this._get('api/init');
	        };
	        AdminApi.prototype.successDummy = function () {
	            return this._get('api/successDummy');
	        };
	        AdminApi.prototype.getUsers = function () {
	            return this._get('api/getUsers');
	        };
	        AdminApi.prototype.getMessages = function (offset, limit) {
	            return this._get('api/getMessages', {
	                offset: offset,
	                limit: limit
	            });
	        };
	        return AdminApi;
	    })(ApiBase);
	    return AdminApi;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=AdminApi.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    var Toaster = (function () {
	        function Toaster() {
	        }
	        Toaster.prototype.success = function (title, message) {
	            this.toast('success', title, message);
	        };
	        Toaster.prototype.info = function (title, message) {
	            this.toast('info', title, message);
	        };
	        Toaster.prototype.warning = function (title, message) {
	            this.toast('warning', title, message);
	        };
	        Toaster.prototype.danger = function (title, message) {
	            this.toast('danger', title, message);
	        };
	        Toaster.prototype.error = function (message) {
	            this.danger('エラー', message);
	        };
	        Toaster.prototype.toast = function (priority, title, message) {
	            $.toaster({
	                priority: priority,
	                title: title,
	                message: message
	            });
	        };
	        return Toaster;
	    })();
	    return Toaster;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Toaster.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    var ResourceContainer = (function () {
	        function ResourceContainer(user, config) {
	            this.user = user;
	            this.config = config;
	        }
	        return ResourceContainer;
	    })();
	    return ResourceContainer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=ResourceContainer.js.map

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    var MenuItem = (function () {
	        function MenuItem(name, path, label, icon) {
	            this.name = name;
	            this.path = path;
	            this.label = label;
	            this.icon = icon;
	            ko.track(this);
	        }
	        return MenuItem;
	    })();
	    return MenuItem;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=MenuItem.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Component) {
	    var SideNav = (function (_super) {
	        __extends(SideNav, _super);
	        function SideNav(menu) {
	            _super.call(this);
	            this.menu = menu;
	            this.isShown = true;
	            ko.track(this);
	        }
	        SideNav.prototype.toggle = function () {
	            this.isShown = !this.isShown;
	        };
	        return SideNav;
	    })(Component);
	    __webpack_require__(25);
	    Component.register('side-nav', SideNav, __webpack_require__(17));
	    return SideNav;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=SideNav.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Component) {
	    var HeaderNav = (function (_super) {
	        __extends(HeaderNav, _super);
	        function HeaderNav() {
	            _super.call(this);
	            ko.track(this);
	        }
	        return HeaderNav;
	    })(Component);
	    Component.register('header-nav', HeaderNav, __webpack_require__(18));
	    return HeaderNav;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=HeaderNav.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    var ApiBase = (function () {
	        function ApiBase() {
	            var _this = this;
	            this._token = "";
	            this._preProcess = function (response) {
	                if (response.error && console) {
	                    console.error(response.error);
	                }
	                if (response.auth_required) {
	                    window.location.href = 'login';
	                    return false;
	                }
	                else {
	                    if (response._token) {
	                        _this._token = response._token;
	                    }
	                    return response;
	                }
	            };
	        }
	        ApiBase.prototype._communicationError = function () {
	            alert("通信エラー");
	        };
	        ApiBase.prototype._get = function (url, data, callback) {
	            if (!data)
	                data = {};
	            data._token = this._token;
	            return $.ajax(url, { type: 'get', data: data, success: callback }).then(this._preProcess, this._communicationError);
	        };
	        /**
	         * GET リクエストを送信
	         */
	        ApiBase.prototype._post = function (url, data, $files, callback) {
	            data = $.extend({ _token: this._token }, data);
	            if ($files) {
	                var dfd = $.Deferred();
	                data['_response_as'] = 'text/html';
	                $files.upload(url, data, function (response) {
	                    dfd.resolveWith(dfd, [response]);
	                    if (callback)
	                        callback(response);
	                }, 'json');
	                return dfd.then(this._preProcess, this._communicationError);
	            }
	            else {
	                data['_response_as'] = 'application/json';
	                return $.ajax(url, {
	                    type: 'post',
	                    data: data,
	                    success: callback
	                }).then(this._preProcess, this._communicationError);
	            }
	        };
	        ApiBase.prototype._serialize = function (data) {
	            return ko.utils.stringifyJson(data);
	        };
	        return ApiBase;
	    })();
	    return ApiBase;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=ApiBase.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Injectable) {
	    var Component = (function (_super) {
	        __extends(Component, _super);
	        function Component() {
	            _super.apply(this, arguments);
	        }
	        Component.register = function (name, klass, template) {
	            ko.components.register(name, {
	                template: template,
	                viewModel: {
	                    createViewModel: function (params, componentInfo) {
	                        return params instanceof klass ? params : ko.unwrap(params.option);
	                    }
	                }
	            });
	        };
	        return Component;
	    })(Injectable);
	    return Component;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Component.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page) {
	    var componentId = 'home-page';
	    var HomePage = (function (_super) {
	        __extends(HomePage, _super);
	        function HomePage() {
	            _super.call(this);
	            this.title = "Home";
	            this.componentId = componentId;
	            ko.track(this);
	        }
	        HomePage.factory = function () {
	            if (this.instance != null)
	                return this.instance;
	            return this.instance = new HomePage();
	        };
	        HomePage.instance = null;
	        return HomePage;
	    })(Page);
	    __webpack_require__(27);
	    Page.register(componentId, HomePage, __webpack_require__(23));
	    return HomePage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=HomePage.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(19), __webpack_require__(20)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, PartialViewModel) {
	    var componentId = "settings-page";
	    var SettingsPage = (function (_super) {
	        __extends(SettingsPage, _super);
	        function SettingsPage() {
	            _super.call(this);
	            this.profileEditor = new ProfileEditor();
	            this.passwordChanger = new PasswordChanger();
	            this.componentId = componentId;
	            ko.track(this);
	        }
	        SettingsPage.factory = function () {
	            if (this.instance != null)
	                return this.instance;
	            return this.instance = new SettingsPage();
	        };
	        SettingsPage.prototype.load = function (context) {
	            this.profileEditor.reset();
	            this.passwordChanger.reset();
	        };
	        SettingsPage.instance = null;
	        return SettingsPage;
	    })(Page);
	    Page.register(componentId, SettingsPage, __webpack_require__(22));
	    var ProfileEditor = (function (_super) {
	        __extends(ProfileEditor, _super);
	        function ProfileEditor() {
	            _super.call(this);
	            this.saving = false;
	            this.reset();
	            ko.track(this);
	        }
	        ProfileEditor.prototype.save = function () {
	            var _this = this;
	            this.saving = true;
	            this.api.successDummy().then(function (res) {
	                if (res.error)
	                    _this.toaster.danger("失敗", res.error);
	                if (res.success)
	                    _this.toaster.success("完了", "プロファイルを更新しました");
	                _this.apply();
	            }).always(function () {
	                _this.saving = false;
	            });
	        };
	        ProfileEditor.prototype.reset = function () {
	            this.profile = {
	                name: this.resources.user.name,
	                email: this.resources.user.email
	            };
	        };
	        ProfileEditor.prototype.apply = function () {
	            this.resources.user.name = this.profile.name;
	            this.resources.user.email = this.profile.email;
	        };
	        return ProfileEditor;
	    })(PartialViewModel);
	    var PasswordChanger = (function (_super) {
	        __extends(PasswordChanger, _super);
	        function PasswordChanger() {
	            _super.call(this);
	            this.saving = false;
	            this.password = "";
	            this.new_password = "";
	            this.password_confirm = "";
	            ko.track(this);
	        }
	        PasswordChanger.prototype.change = function () {
	            var _this = this;
	            if (this.new_password !== this.password_confirm) {
	                this.toaster.warning("エラー", "確認パスワードが一致しません");
	                return;
	            }
	            this.saving = true;
	            this.api.successDummy().then(function (res) {
	                if (res.error)
	                    _this.toaster.danger("失敗", res.error);
	                if (res.success)
	                    _this.toaster.success("完了", "パスワードを変更しました");
	                _this.reset();
	            }).always(function () {
	                _this.saving = false;
	            });
	        };
	        PasswordChanger.prototype.reset = function () {
	            this.password = "";
	            this.new_password = "";
	            this.password_confirm = "";
	        };
	        return PasswordChanger;
	    })(PartialViewModel);
	    return SettingsPage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=SettingsPage.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(19), __webpack_require__(20), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, PartialViewModel, Validation) {
	    var componentId = 'user-page';
	    var UserPage = (function (_super) {
	        __extends(UserPage, _super);
	        function UserPage() {
	            var _this = this;
	            _super.call(this);
	            this.loading = false;
	            this.users = [];
	            this.edit = function (user) {
	                var editor = new UserEditor(user);
	                var exec = function () {
	                    editor.validation.active = true;
	                    if (!editor.validation.isValid())
	                        return;
	                    _this.modal.actionSuspended = true;
	                    _this.api.successDummy().then(function (res) {
	                        if (res.error)
	                            _this.toaster.danger('エラー', res.error);
	                        if (res.success) {
	                            _this.toaster.success('完了', 'ユーザ情報を更新しました');
	                            _this.modal.close();
	                            _this.reload();
	                        }
	                    }).always(function () {
	                        _this.modal.actionSuspended = false;
	                    });
	                };
	                _this.modal.setHeader('ユーザ編集').setCustomBody('userEditorModalBody', editor).setFooter(exec, '保存', 'キャンセル').show();
	            };
	            this.toggleEnabled = function (user) {
	                _this.loading = true;
	                user.enabled = !user.enabled;
	                _this.api.successDummy().then(function (res) {
	                    if (res.error)
	                        _this.toaster.error(res.error);
	                    _this.reload();
	                });
	            };
	            this.remove = function (user) {
	                var exec = function () {
	                    _this.modal.actionSuspended = true;
	                    _this.api.successDummy().then(function (res) {
	                        if (res.error)
	                            _this.toaster.error(res.error);
	                        else {
	                            _this.reload();
	                            _this.modal.close();
	                        }
	                    }).always(function () {
	                        _this.modal.actionSuspended = false;
	                    });
	                };
	                _this.modal.setHeader('ユーザ削除').setBody(user.name + ' (id:' + user.login + ') を削除します。<br>本当によろしいですか？').setFooter(exec, 'はい', 'いいえ').show();
	            };
	            this.componentId = componentId;
	            ko.track(this);
	        }
	        UserPage.factory = function () {
	            if (this.instance != null)
	                return this.instance;
	            return this.instance = new UserPage();
	        };
	        UserPage.prototype.load = function (context) {
	            this.reload();
	        };
	        UserPage.prototype.reload = function () {
	            var _this = this;
	            this.loading = true;
	            this.api.getUsers().then(function (res) {
	                _this.users = res.users;
	            }).always(function () {
	                _this.loading = false;
	            });
	        };
	        UserPage.prototype.add = function () {
	            var _this = this;
	            var editor = new UserEditor();
	            var exec = function () {
	                editor.validation.active = true;
	                if (!editor.validation.isValid())
	                    return;
	                _this.modal.actionSuspended = true;
	                _this.api.successDummy().then(function (res) {
	                    if (res.error)
	                        _this.toaster.danger('エラー', res.error);
	                    if (res.success) {
	                        _this.toaster.success('完了', 'ユーザを追加しました');
	                        _this.modal.close();
	                        _this.reload();
	                    }
	                }).always(function () {
	                    _this.modal.actionSuspended = false;
	                });
	            };
	            this.modal.setHeader('ユーザ追加').setCustomBody('userEditorModalBody', editor).setFooter(exec, '追加', 'キャンセル').show();
	        };
	        UserPage.instance = null;
	        return UserPage;
	    })(Page);
	    var UserEditor = (function (_super) {
	        __extends(UserEditor, _super);
	        function UserEditor(user) {
	            _super.call(this);
	            this.saving = false;
	            this.edit = false;
	            this.password_confirm = "";
	            this.validation = null;
	            this.clearance_options = [
	                { key: 'contact', name: '問い合わせ' },
	                { key: 'member', name: '会員管理' },
	            ];
	            this.edit = user ? true : false;
	            this.user = ko.utils.extend({
	                id: 0,
	                login: '',
	                password: '',
	                name: '',
	                email: '',
	                enabled: true,
	                clearances: []
	            }, user ? user : {});
	            ko.track(this.user);
	            ko.track(this);
	            var user = this.user;
	            this.validation = new Validation({
	                login: ko.getObservable(user, 'login').extend({
	                    required: true,
	                    minLength: 3,
	                    maxLength: 20,
	                    pattern: {
	                        message: '無効なユーザIDです',
	                        params: '^[a-zA-Z0-9_]+$'
	                    }
	                }),
	                password: ko.getObservable(user, 'password').extend({
	                    required: !this.edit,
	                    minLength: 8,
	                    maxLength: 64
	                }),
	                password_confirm: ko.getObservable(this, 'password_confirm').extend({
	                    required: !this.edit,
	                    equal: {
	                        params: ko.getObservable(user, 'password'),
	                        message: 'パスワードが一致しません'
	                    }
	                }),
	                name: ko.getObservable(user, 'name').extend({
	                    required: true,
	                    maxLength: 20
	                }),
	                email: ko.getObservable(user, 'email').extend({
	                    email: true,
	                    maxLength: 255
	                })
	            });
	        }
	        UserEditor.prototype.hasClearanceOf = function (identifier) {
	            return this.user.clearances.indexOf(identifier) >= 0;
	        };
	        UserEditor.prototype.getData = function () {
	            return this.user;
	        };
	        return UserEditor;
	    })(PartialViewModel);
	    Page.register(componentId, UserPage, __webpack_require__(24));
	    return UserPage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=UserPage.js.map

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"navbar-default sidebar\" role=\"navigation\">\r\n\t<div class=\"sidebar-nav navbar-collapse\">\r\n\t\t<ul class=\"nav\" id=\"side-menu\">\r\n\t\t\t{{#foreach menu}}\r\n\t\t\t<li>\r\n\t\t\t\t<a href=\"#{{path}}\" data-bind=\"css:{ active: $parents[1].menuId == name }\">\r\n\t\t\t\t\t<i class=\"fa fa-fw fa-{{icon}}\"></i> {{label}}\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t{{/foreach}}\r\n\t\t</ul>\r\n\t</div>\r\n</div>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"navbar-header\">\r\n\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t</button>\r\n\t<a class=\"navbar-brand\" href=\"./\">{{ resources.config.label.app_title }}</a>\r\n</div><!-- /.navbar-header -->\r\n\r\n<ul class=\"nav navbar-top-links navbar-right\">\r\n\t<li class=\"dropdown\">\r\n\t\t<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\r\n\t\t\t<i class=\"fa fa-user fa-fw\"></i> {{ resources.user.name }} <i class=\"fa fa-caret-down\"></i>\r\n\t\t</a>\r\n\t\t<ul class=\"dropdown-menu dropdown-user\">\r\n\t\t\t<li><a href=\"#settings\"><i class=\"fa fa-gear fa-fw\"></i> アカウント設定</a></li>\r\n\t\t\t{{#if resources.user.is_master}}\r\n\t\t\t<li><a href=\"#user\"><i class=\"fa fa-users fa-fw\"></i> ユーザ管理</a></li>\r\n\t\t\t{{/if}}\r\n\t\t\t<li class=\"divider\"></li>\r\n\t\t\t<li><a href=\"#\"><i class=\"fa fa-sign-out fa-fw\"></i> ログアウト</a></li>\r\n\t\t</ul><!-- /.dropdown-user -->\r\n\t</li><!-- /.dropdown -->\r\n</ul><!-- /.navbar-top-links -->";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Component) {
	    var Page = (function (_super) {
	        __extends(Page, _super);
	        function Page() {
	            _super.apply(this, arguments);
	        }
	        /**
	         * ページ名を取得するメソッド
	         */
	        Page.prototype.getName = function () {
	            throw new Error('getName method is not implemented.');
	        };
	        /**
	         * ページごとのテンプレートIDを取得するメソッド
	         */
	        Page.prototype.getTemplate = function () {
	            throw new Error('getTemplate method is not implemented.');
	        };
	        /**
	         * 遷移後に呼び出されるイベントメソッド
	         * @param context
	         */
	        Page.prototype.load = function (context) {
	        };
	        Page.factory = function () {
	            throw new Error('factory method is not implemented.');
	        };
	        return Page;
	    })(Component);
	    return Page;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Page.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Injectable) {
	    var PartialViewModel = (function (_super) {
	        __extends(PartialViewModel, _super);
	        function PartialViewModel() {
	            _super.apply(this, arguments);
	        }
	        return PartialViewModel;
	    })(Injectable);
	    return PartialViewModel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=PartialViewModel.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    var Validation = (function () {
	        function Validation(validatedViewModel) {
	            var _this = this;
	            this.active = false;
	            this.additional_errors = [];
	            this.isValid = function () {
	                return _this.validatedViewModel.isValid() && _this.additional_errors.length == 0;
	            };
	            this.hasError = function (field) {
	                if (!_this.active)
	                    return false;
	                if (_this.validatedViewModel().hasOwnProperty(field)) {
	                    return !_this.validatedViewModel()[field].isValid();
	                }
	                else {
	                    var error = Enumerable.from(_this.additional_errors).firstOrDefault(function (e) { return e.field === field; }, null);
	                    if (error)
	                        return true;
	                }
	                return false;
	            };
	            this.getError = function (field) {
	                if (!_this.active)
	                    return null;
	                if (_this.validatedViewModel().hasOwnProperty(field)) {
	                    _this.validatedViewModel()[field](); // 変更を検知するために参照しておく
	                    return _this.validatedViewModel()[field].error;
	                }
	                else {
	                    var error = Enumerable.from(_this.additional_errors).firstOrDefault(function (e) { return e.field === field; }, null);
	                    if (error)
	                        return error.message;
	                }
	            };
	            /**
	             * 外部で検査した結果発生したエラーを追加設定する
	             * @param field
	             * @param error
	             */
	            this.setAdditionalError = function (field, error) {
	                _this.additional_errors.push({ field: field, message: error });
	            };
	            /**
	             * 外部エラーをクリア
	             */
	            this.clearAdditionalErrors = function () {
	                _this.additional_errors = [];
	            };
	            ko.track(this);
	            this.validatedViewModel = ko.validatedObservable(validatedViewModel);
	        }
	        return Validation;
	    })();
	    return Validation;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Validation.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">アカウント設定</h1>\r\n\t</div>\r\n</div>\r\n<div class=\"row\">\r\n\r\n\t<div class=\"col-lg-6\">\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\tユーザ設定\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\" data-bind=\"with: profileEditor\">\r\n\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-lg-12\">\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<p>ユーザID: {{ resources.user.login }}</p>\r\n\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\tクリアランス: \r\n\t\t\t\t\t\t\t{{#if resources.user.is_master}}\r\n\t\t\t\t\t\t\t<span class=\"label label-info\">master</span>\r\n\t\t\t\t\t\t\t{{/if}}\r\n\t\t\t\t\t\t\t{{#else}}\r\n\t\t\t\t\t\t\t{{#foreach: resources.user.clearances}}\r\n\t\t\t\t\t\t\t\t<span class=\"label label-success\">{{ $data }}</span>\r\n\t\t\t\t\t\t\t{{/foreach}}\r\n\t\t\t\t\t\t\t{{/else}}\r\n\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"name\">ユーザ名</label>\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"name\" data-bind=\"value: profile.name\"/>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"email\">メールアドレス</label>\r\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" id=\"email\" data-bind=\"value: profile.email\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<button class=\"btn btn-primary btn-block\" data-bind=\"click: save, disable: saving\">\r\n\t\t\t\t\t\t\t変更{{#if saving}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"col-lg-6\">\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\tパスワード変更\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\" data-bind=\"with: passwordChanger\">\r\n\t\t\t\t\r\n\t\t\t\t<p>\r\n\t\t\t\t\tパスワードは半角8字以上で、小文字, 大文字, 数字, 記号のうちいずれか2種類以上の文字を使う必要があります。\r\n\t\t\t\t</p>\r\n\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-lg-12\">\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>現在のパスワード</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: password\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>新しいパスワード</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: new_password\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>新しいパスワード（確認のためもう一度入力してください）</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: password_confirm\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<button class=\"btn btn-primary btn-block\" data-bind=\"click: change, disable: saving\">\r\n\t\t\t\t\t\t\t変更{{#if saving}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\r\n</div>";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">{{title}}</h1>\r\n\t\t<p>No content</p>\r\n\t</div>\r\n</div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t\r\n\t\t<h1 class=\"page-header\">ユーザ管理</h1>\r\n\r\n\t\t<div class=\"panel panel-default\">\r\n            <div class=\"panel-heading clearfix\">\r\n                <div class=\"pull-right\">\r\n                    {{#if loading}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n                    <button class=\"btn btn-primary\" data-bind=\"click: add\">\r\n                        <i class=\"fa fa-user\"></i> ユーザ追加\r\n                    </button>\r\n                </div>\r\n            </div>\r\n\t\t\t<table class=\"table table-hover\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>ID</th>\r\n\t\t\t\t\t<th>名前</th>\r\n\t\t\t\t\t<th>状態</th>\r\n\t\t\t\t\t<th>管理</th>\r\n\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody data-bind=\"foreach: users\">\r\n\t\t\t\t<tr data-bind=\"click: $parent.edit\" style=\"cursor: pointer;\">\r\n\t\t\t\t\t<td>{{ login }}</td>\r\n\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t\t<td>\r\n                        <span class=\"label label-info\" data-bind=\"visible: is_master\">master</span>\r\n                        <span class=\"label label-success\" data-bind=\"visible: enabled\">有効</span>\r\n                        <span class=\"label label-default\" data-bind=\"visible: !enabled\">停止中</span>\r\n                    </td>\r\n\t\t\t\t\t<td>\r\n                        {{#if id !== $parent.resources.user.id}}\r\n                        <div class=\"btn-group btn-group-xs\">\r\n                            <button class=\"btn btn-default\" data-bind=\"click: $parent.toggleEnabled, clickBubble: false\">\r\n                                {{#if enabled}} <i class=\"fa fa-ban\"></i> 停止 {{/if}}\r\n                                {{#else}} <i class=\"fa fa-recycle\"></i> 有効化 {{/else}}\r\n                            </button>\r\n                            <button class=\"btn btn-default\" data-bind=\"click: $parent.remove, clickBubble: false\">\r\n                                <i class=\"fa fa-trash\"></i> 削除\r\n                            </button>\r\n                        </div>\r\n                        {{/if}}\r\n                        {{#else}}\r\n                        ログイン中\r\n                        {{/else}}\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</div>\r\n\t\t\t\t\r\n<!-- ユーザ追加ダイアログテンプレート -->\r\n<script type=\"text/html\" id=\"userEditorModalBody\">\r\n\t<div class=\"row\">\r\n\r\n\t\t{{#if edit}}\r\n\t\t\t<div class=\"well well-sm\">パスワードを変更しない場合はパスワード欄を空にしてください。</div>\r\n\t\t{{/if}}\r\n\t\t\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('login') }\">\r\n\t\t\t\t<label for=\"login\" data-bind=\"css:{ necessary-field: !edit }\">\r\n\t\t\t\t\tユーザID <small>半角英数,アンダースコア(_)</small>\r\n\t\t\t\t</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"login\" placeholder=\"user_id\" \r\n\t\t\t\t\t\t\t value=\"{{ user.login }}\" data-bind=\"disable: edit\" />\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('login') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('name') }\">\r\n\t\t\t\t<label for=\"name\" class=\"necessary-field\">名前</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"name\" value=\"{{ user.name }}\"\r\n\t\t\t\t\t\t\t placeholder=\"{{ resources.config.label.provider }}\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('name') }}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css: { has-error: validation.hasError('password') }\">\r\n\t\t\t\t<label for=\"password\" data-bind=\"css:{ necessary-field: !edit }\">\r\n\t\t\t\t\tパスワード <small>半角英数,記号 8字以上</small>\r\n\t\t\t\t</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"password\" id=\"password\"\r\n\t\t\t\t\t\t\t value=\"{{ user.password }}\" placeholder=\"●●●●●●●●\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('password') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" data-bind=\"css: { has-error: validation.hasError('password_confirm') }\">\r\n\t\t\t\t<label for=\"password_confirm\" data-bind=\"css:{ necessary-field: !edit }\">パスワード（確認）</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"password\" id=\"password_confirm\"\r\n\t\t\t\t\t\t\t value=\"{{ password_confirm }}\" placeholder=\"●●●●●●●●\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('password_confirm') }}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('email') }\">\r\n\t\t\t\t<label for=\"email\">メールアドレス</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"email\" id=\"email\" data-bind=\"value: user.email\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('email') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<h4>使用を許可する機能</h4>\r\n\t\t\t<div class=\"form-group btn-group btn-group-sm\" data-bind=\"foreach: clearance_options\">\r\n\t\t\t\t<label class=\"btn\" data-bind=\"css:{\r\n\t\t\t\t\t\t'btn-default': !$parent.hasClearanceOf(key),\r\n\t\t\t\t\t\t'btn-primary active': $parent.hasClearanceOf(key)\r\n\t\t\t\t\t}\">\r\n\t\t\t\t\t<input type=\"checkbox\" style=\"display: none;\" value=\"{{ key }}\" data-bind=\"checked: $parent.user.clearances\"/>{{ name }}\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</script>";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\parts\\side-nav\\SideNav.less", function() {
			var newContent = require("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\parts\\side-nav\\SideNav.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	exports.push([module.id, "", ""]);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\page\\home\\HomePage.less", function() {
			var newContent = require("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\page\\home\\HomePage.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	exports.push([module.id, "", ""]);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(19), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, Pager) {
	    var componentId = 'contact-page';
	    var ContactPage = (function (_super) {
	        __extends(ContactPage, _super);
	        function ContactPage() {
	            var _this = this;
	            _super.call(this);
	            this.title = "Contact";
	            this.messages = [];
	            this.reload = function () {
	                _this.pager.loading = true;
	                _this.api.getMessages(_this.pager.offset, _this.pager.size).then(function (res) {
	                    _this.pager.count = res.count;
	                    _this.messages = res.messages;
	                }).always(function () {
	                    _this.pager.loading = false;
	                });
	            };
	            this.show = function (message) {
	                _this.modal.setHeader('メッセージ').setCustomBody('messageModalBody', message).setFooter(null, '', '閉じる').show();
	            };
	            this.componentId = componentId;
	            ko.track(this);
	            this.pager = new Pager(ko.getObservable(this, 'messages'), 10);
	        }
	        ContactPage.factory = function () {
	            if (this.instance != null)
	                return this.instance;
	            return this.instance = new ContactPage();
	        };
	        ContactPage.prototype.load = function (context) {
	            ko.computed(this.reload);
	        };
	        ContactPage.instance = null;
	        return ContactPage;
	    })(Page);
	    Page.register(componentId, ContactPage, __webpack_require__(35));
	    return ContactPage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=ContactPage.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Component) {
	    var Pager = (function (_super) {
	        __extends(Pager, _super);
	        function Pager(items, size) {
	            var _this = this;
	            _super.call(this);
	            this.items = items;
	            this.size = size;
	            this.loading = false;
	            this.count = 0;
	            this.page = 1;
	            this.pageInput = 1;
	            ko.track(this);
	            ko.defineProperty(this, 'pages', function () { return Math.ceil(_this.count / _this.size); });
	            ko.defineProperty(this, 'offset', function () { return (_this.page - 1) * _this.size; });
	        }
	        Pager.prototype.goTo = function (page) {
	            if (page < 1)
	                page = 1;
	            if (page > this.pages)
	                page = this.pages;
	            this.page = page;
	            this.pageInput = page;
	        };
	        Pager.prototype.first = function () {
	            this.goTo(1);
	        };
	        Pager.prototype.prev = function () {
	            this.goTo(this.page - 1);
	        };
	        Pager.prototype.next = function () {
	            this.goTo(this.page + 1);
	        };
	        Pager.prototype.last = function () {
	            this.goTo(this.pages);
	        };
	        Pager.prototype.inputted = function () {
	            this.goTo(this.pageInput);
	        };
	        return Pager;
	    })(Component);
	    __webpack_require__(36);
	    Component.register('pager', Pager, __webpack_require__(38));
	    return Pager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Pager.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">Contacts</h1>\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\t<pager params=\"option: pager\"></pager>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<table class=\"table table-hover\">\r\n\t\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th>日時</th>\r\n\t\t\t\t\t\t<th>お名前</th>\r\n\t\t\t\t\t\t<th>タイトル</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody data-bind=\"foreach: messages\">\r\n\t\t\t\t\t<tr style=\"cursor: pointer;\" data-bind=\"click: $parent.show\">\r\n\t\t\t\t\t\t<td>{{ date }}</td>\r\n\t\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t\t\t<td>{{ title }}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<script type=\"text/html\" id=\"messageModalBody\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<table class=\"table\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th style=\"width: 80px;\">日時</th>\r\n\t\t\t\t\t<td>{{ date }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>お名前</th>\r\n\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>タイトル</th>\r\n\t\t\t\t\t<td>{{ title }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>本文</th>\r\n\t\t\t\t\t<td style=\"white-space: pre-wrap;\">{{ body }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</script>";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\parts\\pager\\Pager.less", function() {
			var newContent = require("!!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\css-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\node_modules\\less-loader\\index.js!C:\\Users\\Kenta\\PhpstormProjects\\kots-spa-admin-example\\app\\parts\\pager\\Pager.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(30)();
	exports.push([module.id, "ul.ko-pager {\n  float: right;\n  height: 24px;\n  margin-bottom: 4px;\n}\nul.ko-pager > li {\n  display: inline-block;\n  font-size: 14px;\n}\nul.ko-pager > li.pager-input {\n  font-size: 13px;\n  margin: 4px 0;\n  color: #777;\n  border: solid 1px #aaa;\n  background-color: white;\n  padding: 0 2px;\n  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);\n  border-radius: 3px;\n}\nul.ko-pager > li.pager-input input {\n  width: 35px;\n  text-align: right;\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0 2px;\n  vertical-align: baseline;\n}\nul.ko-pager > li.pager-summary {\n  color: #888;\n  margin-right: 10px;\n}\nul.ko-pager > li.btn {\n  margin-top: -2px;\n  cursor: pointer;\n  color: #428bca;\n}\nul.ko-pager > li.btn > i {\n  margin: 0 1px;\n}\nul.ko-pager > li.btn:hover {\n  background-color: #ddd;\n}\n", ""]);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul class=\"ko-pager\">\r\n\t<li class=\"pager-summary\" data-bind=\"visible: !loading\">\r\n\t\t<span class=\"hidden-xs\">\r\n\t\t\t<!--ko if: count > 0 -->\r\n\t\t\t<span data-bind=\"text: count\"> </span> 件中\r\n\t\t\t<span data-bind=\"text: offset + 1\"> </span> -\r\n\t\t\t<span data-bind=\"text: offset + items.length\"> </span> 件目を表示中\r\n\t\t\t<!--/ko-->\r\n\t\t\t<!--ko else-->\r\n\t\t\tアイテムが登録されていません\r\n\t\t\t<!--/ko-->\r\n\t\t</span>\r\n\t</li>\r\n\t<li class=\"indicator\" data-bind=\"visible: loading\">\r\n\t\t<i class=\"fa fa-refresh fa-spin\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: first\">\r\n\t\t<i class=\"fa fa-step-backward\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: prev\">\r\n\t\t<i class=\"fa fa-caret-left\"></i>\r\n\t</li>\r\n\t<li class=\"pager-input\" onclick=\"$(this).find('input').focus();\">\r\n\t\t<form data-bind=\"submit: goToInputted\">\r\n\t\t\t<input type=\"text\" onfocus=\"this.select();\"\r\n\t\t\t\t\t\t data-bind=\"value: pageInput,\r\n\t\t\t\t\t\t\t\t\t\t\t\tvalueUpdate: 'afterkeydown'\" />\r\n\t\t\t/<span data-bind=\"text: pages\"> </span>\r\n\t\t</form>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: next\">\r\n\t\t<i class=\"fa fa-caret-right\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: last\">\r\n\t\t<i class=\"fa fa-step-forward\"></i>\r\n\t</li>\r\n</ul>\r\n";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Component) {
	    var Modal = (function (_super) {
	        __extends(Modal, _super);
	        function Modal() {
	            _super.call(this);
	            this.size = null;
	            this.header = null;
	            this.body = null;
	            this.footer = null;
	            this.actionSuspended = false;
	            ko.track(this);
	            this.shown = ko.observable(false);
	            this.shown.subscribe(function (shown) {
	                if (!shown) {
	                    this.size = null;
	                    this.header = null;
	                    this.body = null;
	                    this.footer = null;
	                }
	            });
	        }
	        /**
	         * モーダルダイアログの横幅サイズを変更
	         * @param size 'large' または 'small'
	         * @returns {Modal}
	         */
	        Modal.prototype.setSize = function (size) {
	            this.size = size;
	            return this;
	        };
	        /**
	         * @param template テンプレートID
	         * @param data バインドするデータコンテキストまたは ViewModel
	         * @returns {Modal}
	         */
	        Modal.prototype.setCustomHeader = function (template, data) {
	            this.header = { name: template, data: data };
	            return this;
	        };
	        /**
	         * @param template テンプレートID
	         * @param data バインドするデータコンテキストまたは ViewModel
	         * @returns {Modal}
	         */
	        Modal.prototype.setCustomBody = function (template, data) {
	            this.body = { name: template, data: data };
	            return this;
	        };
	        /**
	         * @param template テンプレートID
	         * @param data バインドするデータコンテキストまたは ViewModel
	         * @returns {Modal}
	         */
	        Modal.prototype.setCustomFooter = function (template, data) {
	            this.footer = { name: template, data: data };
	            return this;
	        };
	        Modal.prototype.setHeader = function (label) {
	            return this.setCustomHeader('modalHeader', { label: label });
	        };
	        Modal.prototype.setBody = function (content) {
	            return this.setCustomBody('modalBody', { content: content });
	        };
	        Modal.prototype.setFooter = function (action, primaryLabel, closeLabel) {
	            var data = {
	                action: action,
	                primaryLabel: primaryLabel,
	                closeLabel: closeLabel,
	                hasError: false
	            };
	            ko.track(data);
	            return this.setCustomFooter('modalFooter', data);
	        };
	        Modal.prototype.show = function (arg1, arg2, arg3, arg4, arg5) {
	            if (arg1 != null) {
	                this.setHeader(arg1);
	                this.setBody(arg2);
	                if (typeof arg3 == 'function') {
	                    this.setFooter(arg3, arg4 || 'OK', arg5 || 'Cancel');
	                }
	                else {
	                    this.setFooter(null, '', arg3 || 'OK');
	                }
	            }
	            this.shown(true);
	            return this;
	        };
	        Modal.prototype.close = function () {
	            this.shown(false);
	            return this;
	        };
	        return Modal;
	    })(Component);
	    Component.register('modal', Modal, __webpack_require__(40));
	    return Modal;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Modal.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"\r\n\t\t data-bind=\"modalShown: shown\">\r\n\t<div class=\"modal-dialog\" data-bind=\"css:{ modal-lg: size == 'large', modal-sm: size == 'small' }\">\r\n\t\t<div class=\"modal-content\">\r\n\t\t\t{{#if header }}\r\n\t\t\t<div class=\"modal-header\" data-bind=\"template: header\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if body }}\r\n\t\t\t<div class=\"modal-body\" data-bind=\"template: body\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if footer && !actionSuspended }}\r\n\t\t\t<div class=\"modal-footer\" data-bind=\"template: footer\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if actionSuspended }}\r\n\t\t\t<div class=\"modal-footer\" data-bind=\"template:{ name: 'suspendedModalFooter' }\"></div>\r\n\t\t\t{{/if}}\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<script type=\"text/html\" id=\"modalHeader\">\r\n\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\r\n\t<h3 data-bind=\"text: label\"></h3>\r\n</script>\r\n<script type=\"text/html\" id=\"modalBody\">\r\n\t<div data-bind=\"html: content\"></div>\r\n</script>\r\n<script type=\"text/html\" id=\"modalFooter\">\r\n\t<span class=\"text-danger\" data-bind=\"visible: hasError\">エラーがあります。訂正してください。</span>\r\n\t{{#if $data.action }}\r\n\t<a href=\"#\" class=\"btn btn-primary\" data-bind=\"click: action, html: primaryLabel\"></a>\r\n\t{{/if}}\r\n\t<a href=\"#\" class=\"btn btn-default\" data-bind=\"html: closeLabel\" data-dismiss=\"modal\"></a>\r\n</script>\r\n<script type=\"text/html\" id=\"suspendedModalFooter\">\r\n\t<i class=\"fa fa-spinner fa-spin\"></i>\r\n</script>";

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmNkMmY1OGUwNjkwNDQ5N2JlMWQiLCJ3ZWJwYWNrOi8vLy4vQXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vU2hlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZGkvRGVwZW5kZW5jeUluamVjdG9yLmpzIiwid2VicGFjazovLy8uL2RpL0RlcGVuZGVuY3lJbmplY3RhYmxlLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL0FkbWluQXBpLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL1RvYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvUmVzb3VyY2VDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvTWVudUl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvc2lkZS1uYXYvU2lkZU5hdi5qcyIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9oZWFkZXItbmF2L0hlYWRlck5hdi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9BcGlCYXNlLmpzIiwid2VicGFjazovLy8uL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2hvbWUvSG9tZVBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZS91c2VyL1VzZXJQYWdlLmpzIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYuaHRtbCIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9oZWFkZXItbmF2L0hlYWRlck5hdi5odG1sIiwid2VicGFjazovLy8uL3BhZ2UvUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL1BhcnRpYWxWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvVmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL3NldHRpbmdzL1NldHRpbmdzUGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhZ2UvaG9tZS9Ib21lUGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhZ2UvdXNlci9Vc2VyUGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYubGVzcz81ZWYyIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYubGVzcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2hvbWUvSG9tZVBhZ2UubGVzcz85MmFmIiwid2VicGFjazovLy8uL3BhZ2UvaG9tZS9Ib21lUGFnZS5sZXNzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZS9jb250YWN0L0NvbnRhY3RQYWdlLmpzIiwid2VicGFjazovLy8uL3BhcnRzL3BhZ2VyL1BhZ2VyLmpzIiwid2VicGFjazovLy8uL3BhZ2UvY29udGFjdC9Db250YWN0UGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhcnRzL3BhZ2VyL1BhZ2VyLmxlc3M/OGM2MSIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9wYWdlci9QYWdlci5sZXNzIiwid2VicGFjazovLy8uL3BhcnRzL3BhZ2VyL1BhZ2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvbW9kYWwvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvbW9kYWwvTW9kYWwuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyx1QkFBdUIsRUFBRTtBQUNoRSw0Q0FBMkMsc0JBQXNCLEVBQUU7QUFDbkUsMENBQXlDLG9CQUFvQixFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCx5QkFBd0I7QUFDeEIsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQSw2QkFBNEI7QUFDNUI7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCx3Qzs7Ozs7O0FDNUNBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRSxlQUFlLEVBQUUsZ0JBQWdCLFVBQVUsRUFBRTtBQUN4SCxvRkFBbUYsMERBQTBELEVBQUUsdUJBQXVCLDhEQUE4RCxFQUFFO0FBQ3RPLGdFQUErRCwwREFBMEQsRUFBRSx5QkFBeUIsZUFBZSxFQUFFLGdCQUFnQixrQkFBa0IsRUFBRTtBQUN6TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdDQUFnQztBQUMxRDtBQUNBLDJDQUEwQyxnQ0FBZ0MsRUFBRTtBQUM1RSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsb0NBQW9DLEVBQUU7QUFDaEYsa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLGdDQUFnQyxFQUFFO0FBQzVFLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMEIscUNBQXFDO0FBQy9EO0FBQ0EsMkNBQTBDLG1DQUFtQyxFQUFFO0FBQy9FLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Qsa0M7Ozs7OztpRUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0QsK0M7Ozs7OztpRUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQztBQUNELGlEOzs7Ozs7QUNqREE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxxQzs7Ozs7O2lFQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxvQzs7Ozs7O2lFQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCw4Qzs7Ozs7OztpRUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxxQzs7Ozs7O0FDYkE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELG9DOzs7Ozs7QUN4QkE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNELHNDOzs7Ozs7aUVDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLDZDQUE2QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLHNCQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxvQzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxzQzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELHFDOzs7Ozs7QUM1QkE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQztBQUNELHlDOzs7Ozs7QUNuR0E7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixnQ0FBZ0M7QUFDakQsa0JBQWlCLDhCQUE4QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNELHFDOzs7Ozs7O0FDOUtBLHFMQUFvTCxlQUFlLHVDQUF1QyxNQUFNLG9CQUFvQixxQ0FBcUMsMENBQTBDLE1BQU0sVUFBVSxPQUFPLDJDQUEyQyxVQUFVLHFDOzs7Ozs7QUNBL1osNllBQTRZLG9DQUFvQyxtUEFBbVAsdUJBQXVCLG9NQUFvTSw4QkFBOEIsOEZBQThGLEtBQUssK047Ozs7OztBQ0EvL0I7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0QsaUM7Ozs7OztBQ3JDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCw2Qzs7Ozs7O2lFQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVHQUFzRywwQkFBMEIsRUFBRTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsdUdBQXNHLDBCQUEwQixFQUFFO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLCtCQUErQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQztBQUNELHVDOzs7Ozs7QUN4REEsMGhCQUF5aEIsd0JBQXdCLHlFQUF5RSw4QkFBOEIsb0ZBQW9GLEtBQUssb0JBQW9CLE9BQU8sb0JBQW9CLHFDQUFxQywwREFBMEQsU0FBUywyQkFBMkIsVUFBVSxvQkFBb0IsT0FBTyxrbkJBQWtuQixZQUFZLDJDQUEyQyxLQUFLLDR4Q0FBNHhDLFlBQVksMkNBQTJDLEtBQUsscUk7Ozs7OztBQ0E5OEYseUdBQXdHLE9BQU8sc0Q7Ozs7OztBQ0EvRyxzU0FBcVMsYUFBYSwyQ0FBMkMsS0FBSyxxakJBQXFqQix1QkFBdUIsU0FBUyx5QkFBeUIsUUFBUSxpYUFBaWEsc0NBQXNDLHlPQUF5TyxhQUFhLGtDQUFrQyxLQUFLLHNDQUFzQyxPQUFPLHVDQUF1QyxPQUFPLGdWQUFnVixLQUFLLDhCQUE4QixPQUFPLCtEQUErRCxPQUFPLGdRQUFnUSxVQUFVLG9GQUFvRixLQUFLLDZGQUE2RiwwQ0FBMEMscURBQXFELHlCQUF5QixtTUFBbU0sY0FBYyxzRkFBc0YsZ0NBQWdDLDRFQUE0RSx5Q0FBeUMscUpBQXFKLGFBQWEscUNBQXFDLG1DQUFtQyx5REFBeUQsK0JBQStCLG1JQUFtSSw2Q0FBNkMsd0RBQXdELHlCQUF5Qiw4S0FBOEssaUJBQWlCLGtGQUFrRixtQ0FBbUMsNkVBQTZFLHFEQUFxRCxnRUFBZ0UseUJBQXlCLG9JQUFvSSxvQkFBb0Isa0ZBQWtGLDJDQUEyQyxnTEFBZ0wsMENBQTBDLCtNQUErTSxnQ0FBZ0MseU1BQXlNLDRJQUE0SSxnRUFBZ0UsYUFBYSxPQUFPLHFEQUFxRCxRQUFRLHFGOzs7Ozs7QUNBaitLOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQThJO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNqQkE7QUFDQSxtQzs7Ozs7O0FDREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBOEk7QUFDOUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ2pCQTtBQUNBLG1DOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBd0Q7QUFDeEQsNkNBQTRDO0FBQzVDLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsd0M7Ozs7OztBQzdDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEwRCw0Q0FBNEMsRUFBRTtBQUN4Ryw0REFBMkQsc0NBQXNDLEVBQUU7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGtDOzs7Ozs7QUNuREEseW1CQUF3bUIsMkRBQTJELFFBQVEsMkJBQTJCLFFBQVEsMkJBQTJCLFNBQVMsa1VBQWtVLDhCQUE4QixRQUFRLG9GQUFvRixRQUFRLHFGQUFxRixTQUFTLCtHQUErRyxLQUFLLFFBQVEsaUY7Ozs7OztBQ0FoNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBOEk7QUFDOUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ2pCQTtBQUNBLHdDQUF1QyxpQkFBaUIsaUJBQWlCLHVCQUF1QixHQUFHLG9CQUFvQiwwQkFBMEIsb0JBQW9CLEdBQUcsZ0NBQWdDLG9CQUFvQixrQkFBa0IsZ0JBQWdCLDJCQUEyQiw0QkFBNEIsbUJBQW1CLGlEQUFpRCx1QkFBdUIsR0FBRyxzQ0FBc0MsZ0JBQWdCLHNCQUFzQixrQ0FBa0MsY0FBYyxjQUFjLG1CQUFtQiw2QkFBNkIsR0FBRyxrQ0FBa0MsZ0JBQWdCLHVCQUF1QixHQUFHLHdCQUF3QixxQkFBcUIsb0JBQW9CLG1CQUFtQixHQUFHLDRCQUE0QixrQkFBa0IsR0FBRyw4QkFBOEIsMkJBQTJCLEdBQUcsVTs7Ozs7O0FDRGgyQix3M0JBQXUzQiwyR0FBMkcsdWE7Ozs7OztBQ0FsK0I7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EseURBQXdELGVBQWU7QUFDdkU7QUFDQTtBQUNBLHFEQUFvRCxtQkFBbUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsa0M7Ozs7OztBQ3RHQSxxTEFBb0wsdURBQXVELG9EQUFvRCxhQUFhLHVGQUF1RixLQUFLLFlBQVksV0FBVyxtRkFBbUYsS0FBSyxZQUFZLGlDQUFpQyx1RkFBdUYsS0FBSyxZQUFZLHNCQUFzQiw0REFBNEQsK0JBQStCLHFCQUFxQixLQUFLLCtlQUErZSxtQkFBbUIsMEdBQTBHLEtBQUssNE8iLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiY2QyZjU4ZTA2OTA0NDk3YmUxZFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdkaS9EZXBlbmRlbmN5SW5qZWN0b3InLCAnZGkvRGVwZW5kZW5jeUluamVjdGFibGUnLCAnLi9TaGVsbCcsICdzZXJ2aWNlcy9BZG1pbkFwaScsICdzZXJ2aWNlcy9Ub2FzdGVyJywgJ3NlcnZpY2VzL1Jlc291cmNlQ29udGFpbmVyJywgJ3BhcnRzL21vZGFsL01vZGFsJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBEZXBlbmRlbmN5SW5qZWN0b3IsIEluamVjdGFibGUsIFNoZWxsLCBBZG1pbkFwaSwgVG9hc3RlciwgUmVzb3VyY2VDb250YWluZXIsIE1vZGFsKSB7XHJcbiAgICB2YXIgQXBwbGljYXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhBcHBsaWNhdGlvbiwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBBcHBsaWNhdGlvbigpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hlbGwgPSBudWxsO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkaSA9IHRoaXMuZGVjbGFyZVNlcnZpY2VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpLmluaXQoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGtvLnRyYWNrKHJlcy51c2VyKTtcclxuICAgICAgICAgICAgICAgIGRpLnNldCgncmVzb3VyY2VzJywgbmV3IFJlc291cmNlQ29udGFpbmVyKHJlcy51c2VyLCByZXMuY29uZmlnKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hlbGwgPSBuZXcgU2hlbGwoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNoZWxsID0gc2hlbGwuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2hlbGwubG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5kZWNsYXJlU2VydmljZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkaSA9IERlcGVuZGVuY3lJbmplY3Rvci5mYWN0b3J5RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBkaS5zZXQoJ2FwaScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBBZG1pbkFwaSgpOyB9LCB0cnVlKTtcclxuICAgICAgICAgICAgZGkuc2V0KCd0b2FzdGVyJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFRvYXN0ZXIoKTsgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGRpLnNldCgnbW9kYWwnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTW9kYWwoKTsgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbjtcclxuICAgIH0pKEluamVjdGFibGUpO1xyXG4gICAgS25vY2tvdXRFbHNlLmluaXQoKTsgLy8ga25vY2tvdXQtZWxzZSAgICA6IGh0dHBzOi8vZ2l0aHViLmNvbS9icmlhbm1odW50L2tub2Nrb3V0LWVsc2VcclxuICAgIGtvLnB1bmNoZXMuZW5hYmxlQWxsKCk7IC8vIGtub2Nrb3V0LXB1bmNoZXMgOiBodHRwczovL2dpdGh1Yi5jb20vbWJlc3Qva25vY2tvdXQucHVuY2hlc1xyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFwcCA9IG5ldyBBcHBsaWNhdGlvbigpO1xyXG4gICAgICAgIHdpbmRvd1snYXBwJ10gPSBhcHA7IC8vZm9yIENvbnNvbGUgRGVidWcuXHJcbiAgICAgICAga28uYXBwbHlCaW5kaW5ncyhhcHApO1xyXG4gICAgICAgIGFwcC5pbml0aWFsaXplKCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBBcHBsaWNhdGlvbjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFwcGxpY2F0aW9uLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9BcHBsaWNhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdkaS9EZXBlbmRlbmN5SW5qZWN0YWJsZScsICdwYXJ0cy9zaWRlLW5hdi9TaWRlTmF2JywgJ3BhcnRzL2hlYWRlci1uYXYvSGVhZGVyTmF2JywgJ3BhcnRzL01lbnVJdGVtJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBJbmplY3RhYmxlLCBTaWRlTmF2LCBIZWFkZXJOYXYsIE1lbnVJdGVtKSB7XHJcbiAgICB2YXIgU2hlbGwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhTaGVsbCwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBTaGVsbCgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZU5hdiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVNYXAgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSB0aGlzLm1vZGFsO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2hlbGwucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByb3V0ZXMgPSB0aGlzLmRlY2xhcmVSb3V0ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZU1hcCA9IEVudW1lcmFibGUuZnJvbShyb3V0ZXMpLnRvT2JqZWN0KGZ1bmN0aW9uIChyKSB7IHJldHVybiByLm5hbWU7IH0sIGZ1bmN0aW9uIChyKSB7IHJldHVybiByOyB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaWRlTmF2ID0gbmV3IFNpZGVOYXYoRW51bWVyYWJsZS5mcm9tKHJvdXRlcykud2hlcmUoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIubmF2ICE9IG51bGwgJiYgX3RoaXMudXNlckhhc0NsZWFyYW5jZU9mKHIubmFtZSk7IH0pLnNlbGVjdChmdW5jdGlvbiAocikgeyByZXR1cm4gbmV3IE1lbnVJdGVtKHIubmFtZSwgci5wYXRoLCByLm5hdi5sYWJlbCwgci5uYXYuaWNvbik7IH0pLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgICAgIHJvdXRpZShFbnVtZXJhYmxlLmZyb20ocm91dGVzKS53aGVyZShmdW5jdGlvbiAocikgeyByZXR1cm4gci5uYXYgPT0gbnVsbCB8fCBfdGhpcy51c2VySGFzQ2xlYXJhbmNlT2Yoci5uYW1lKTsgfSkudG9PYmplY3QoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIucGF0aDsgfSwgZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIuaGFuZGxlcjsgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlck5hdiA9IG5ldyBIZWFkZXJOYXYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTaGVsbC5wcm90b3R5cGUudXNlckhhc0NsZWFyYW5jZU9mID0gZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgaWYgKGlkZW50aWZpZXIgPT09ICdob21lJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBob21lIOOBr+eEoeadoeS7tuOBp+ioseWPr1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNvdXJjZXMudXNlci5pc19tYXN0ZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VzLnVzZXIuY2xlYXJhbmNlcy5pbmRleE9mKGlkZW50aWZpZXIpID49IDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTaGVsbC5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGZpeFNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wT2Zmc2V0ID0gNTA7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSAod2luZG93LmlubmVyV2lkdGggPiAwKSA/IHdpbmRvdy5pbm5lcldpZHRoIDogc2NyZWVuLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnZGl2Lm5hdmJhci1jb2xsYXBzZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcE9mZnNldCA9IDEwMDsgLy8gMi1yb3ctbWVudVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnZGl2Lm5hdmJhci1jb2xsYXBzZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgPiAwKSA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHNjcmVlbi5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgLSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVpZ2h0IDwgMSlcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodCA+IHRvcE9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZS13cmFwcGVyXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgKGhlaWdodCkgKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXhTaXplKCk7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZml4U2l6ZSk7XHJcbiAgICAgICAgICAgIHJvdXRpZSh3aW5kb3cubG9jYXRpb24uaGFzaCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTaGVsbC5wcm90b3R5cGUudHJhbnNpdCA9IGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHRoaXMucm91dGVNYXBbbmFtZV0ucGFnZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UubG9hZChjb250ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5tZW51SWQgPSBuYW1lO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJyNwYWdlLXdyYXBwZXIgPiAucm93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU2hlbGwucHJvdG90eXBlLmRlY2xhcmVSb3V0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJlcXVpcmUoJ3BhZ2UvaG9tZS9Ib21lUGFnZScpLmZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2OiB7IGxhYmVsOiAnSG9tZScsIGljb246ICdmb2xkZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudHJhbnNpdCgnaG9tZScsIHt9KTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2V0dGluZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJlcXVpcmUoJ3BhZ2Uvc2V0dGluZ3MvU2V0dGluZ3NQYWdlJykuZmFjdG9yeSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnc2V0dGluZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnRyYW5zaXQoJ3NldHRpbmdzJywge30pOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd1c2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiByZXF1aXJlKCdwYWdlL3VzZXIvVXNlclBhZ2UnKS5mYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICd1c2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy50cmFuc2l0KCd1c2VyJywge30pOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb250YWN0JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiByZXF1aXJlKCdwYWdlL2NvbnRhY3QvQ29udGFjdFBhZ2UnKS5mYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdjogeyBsYWJlbDogJ0NvbnRhY3QnLCBpY29uOiAnZW52ZWxvcGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2NvbnRhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnRyYW5zaXQoJ2NvbnRhY3QnLCB7fSk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gU2hlbGw7XHJcbiAgICB9KShJbmplY3RhYmxlKTtcclxuICAgIHJldHVybiBTaGVsbDtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNoZWxsLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9TaGVsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIHZhciBEZXBlbmRlbmN5SW5qZWN0b3IgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIERlcGVuZGVuY3lJbmplY3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZF9pbnN0YW5jZXMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGVwZW5kZW5jeUluamVjdG9yLmdldERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgRGVwZW5kZW5jeUluamVjdG9yLnNldERlZmF1bHQgPSBmdW5jdGlvbiAoX2RlZmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdCA9IF9kZWZhdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgRGVwZW5kZW5jeUluamVjdG9yLmZhY3RvcnlEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdCA9IG5ldyBEZXBlbmRlbmN5SW5qZWN0b3IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIERlcGVuZGVuY3lJbmplY3Rvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2UsIHNoYXJlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzW25hbWVdID0gc2VydmljZTtcclxuICAgICAgICAgICAgc2VydmljZS5fc2hhcmVkID0gc2hhcmVkIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIERlcGVuZGVuY3lJbmplY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG5hbWUsIHNoYXJlZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmljZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdTZXJ2aWNlJyArIG5hbWUgKyAnIG5vdCBmb3VuZC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2VydmljZSA9IHRoaXMuc2VydmljZXNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VydmljZSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VydmljZS5fc2hhcmVkIHx8IHNoYXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZF9pbnN0YW5jZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkX2luc3RhbmNlc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZF9pbnN0YW5jZXNbbmFtZV0gPSBzZXJ2aWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gRGVwZW5kZW5jeUluamVjdG9yO1xyXG4gICAgfSkoKTtcclxuICAgIHJldHVybiBEZXBlbmRlbmN5SW5qZWN0b3I7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZXBlbmRlbmN5SW5qZWN0b3IuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpL0RlcGVuZGVuY3lJbmplY3Rvci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EZXBlbmRlbmN5SW5qZWN0b3InXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIERlcGVuZGVuY3lJbmplY3Rvcikge1xyXG4gICAgdmFyIERlcGVuZGVuY3lJbmplY3RhYmxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBEZXBlbmRlbmN5SW5qZWN0YWJsZSgpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlcGVuZGVuY3lJbmplY3RhYmxlLnByb3RvdHlwZSwgXCJkaVwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9kaSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGVwZW5kZW5jeUluamVjdG9yLmdldERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZGkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpID0gZGk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZXBlbmRlbmN5SW5qZWN0YWJsZS5wcm90b3R5cGUsIFwiYXBpXCIsIHtcclxuICAgICAgICAgICAgLy8gYXBwbGljYXRpb24gc2VydmljZXMgZ2V0dGVyc1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpLmdldCgnYXBpJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZXBlbmRlbmN5SW5qZWN0YWJsZS5wcm90b3R5cGUsIFwicmVzb3VyY2VzXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaS5nZXQoJ3Jlc291cmNlcycpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVwZW5kZW5jeUluamVjdGFibGUucHJvdG90eXBlLCBcInRvYXN0ZXJcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpLmdldCgndG9hc3RlcicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVwZW5kZW5jeUluamVjdGFibGUucHJvdG90eXBlLCBcIm1vZGFsXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaS5nZXQoJ21vZGFsJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBEZXBlbmRlbmN5SW5qZWN0YWJsZTtcclxuICAgIH0pKCk7XHJcbiAgICByZXR1cm4gRGVwZW5kZW5jeUluamVjdGFibGU7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZXBlbmRlbmN5SW5qZWN0YWJsZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGkvRGVwZW5kZW5jeUluamVjdGFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9BcGlCYXNlJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBBcGlCYXNlKSB7XHJcbiAgICB2YXIgQWRtaW5BcGkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhBZG1pbkFwaSwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBBZG1pbkFwaSgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFkbWluQXBpLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KCdhcGkvaW5pdCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQWRtaW5BcGkucHJvdG90eXBlLnN1Y2Nlc3NEdW1teSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldCgnYXBpL3N1Y2Nlc3NEdW1teScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQWRtaW5BcGkucHJvdG90eXBlLmdldFVzZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KCdhcGkvZ2V0VXNlcnMnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFkbWluQXBpLnByb3RvdHlwZS5nZXRNZXNzYWdlcyA9IGZ1bmN0aW9uIChvZmZzZXQsIGxpbWl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXQoJ2FwaS9nZXRNZXNzYWdlcycsIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFkbWluQXBpO1xyXG4gICAgfSkoQXBpQmFzZSk7XHJcbiAgICByZXR1cm4gQWRtaW5BcGk7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BZG1pbkFwaS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvQWRtaW5BcGkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XHJcbiAgICB2YXIgVG9hc3RlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gVG9hc3RlcigpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uICh0aXRsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCdzdWNjZXNzJywgdGl0bGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uICh0aXRsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCdpbmZvJywgdGl0bGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uICh0aXRsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCd3YXJuaW5nJywgdGl0bGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUuZGFuZ2VyID0gZnVuY3Rpb24gKHRpdGxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ2RhbmdlcicsIHRpdGxlLCBtZXNzYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRvYXN0ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5kYW5nZXIoJ+OCqOODqeODvCcsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUudG9hc3QgPSBmdW5jdGlvbiAocHJpb3JpdHksIHRpdGxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICQudG9hc3Rlcih7XHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFRvYXN0ZXI7XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIFRvYXN0ZXI7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ub2FzdGVyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9Ub2FzdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIFJlc291cmNlQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBSZXNvdXJjZUNvbnRhaW5lcih1c2VyLCBjb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZXNvdXJjZUNvbnRhaW5lcjtcclxuICAgIH0pKCk7XHJcbiAgICByZXR1cm4gUmVzb3VyY2VDb250YWluZXI7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZXNvdXJjZUNvbnRhaW5lci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvUmVzb3VyY2VDb250YWluZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XHJcbiAgICB2YXIgTWVudUl0ZW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIE1lbnVJdGVtKG5hbWUsIHBhdGgsIGxhYmVsLCBpY29uKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNZW51SXRlbTtcclxuICAgIH0pKCk7XHJcbiAgICByZXR1cm4gTWVudUl0ZW07XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1NZW51SXRlbS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvTWVudUl0ZW0uanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vLi4vQ29tcG9uZW50J10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBDb21wb25lbnQpIHtcclxuICAgIHZhciBTaWRlTmF2ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoU2lkZU5hdiwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBTaWRlTmF2KG1lbnUpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTaWRlTmF2LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93biA9ICF0aGlzLmlzU2hvd247XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gU2lkZU5hdjtcclxuICAgIH0pKENvbXBvbmVudCk7XHJcbiAgICByZXF1aXJlKCcuL1NpZGVOYXYubGVzcycpO1xyXG4gICAgQ29tcG9uZW50LnJlZ2lzdGVyKCdzaWRlLW5hdicsIFNpZGVOYXYsIHJlcXVpcmUoJy4vU2lkZU5hdi5odG1sJykpO1xyXG4gICAgcmV0dXJuIFNpZGVOYXY7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1TaWRlTmF2LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9zaWRlLW5hdi9TaWRlTmF2LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uLy4uL0NvbXBvbmVudCddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgQ29tcG9uZW50KSB7XHJcbiAgICB2YXIgSGVhZGVyTmF2ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoSGVhZGVyTmF2LCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIEhlYWRlck5hdigpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSGVhZGVyTmF2O1xyXG4gICAgfSkoQ29tcG9uZW50KTtcclxuICAgIENvbXBvbmVudC5yZWdpc3RlcignaGVhZGVyLW5hdicsIEhlYWRlck5hdiwgcmVxdWlyZSgnLi9IZWFkZXJOYXYuaHRtbCcpKTtcclxuICAgIHJldHVybiBIZWFkZXJOYXY7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1IZWFkZXJOYXYuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL2hlYWRlci1uYXYvSGVhZGVyTmF2LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIHZhciBBcGlCYXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBBcGlCYXNlKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl90b2tlbiA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZVByb2Nlc3MgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvciAmJiBjb25zb2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYXV0aF9yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2xvZ2luJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuX3Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90b2tlbiA9IHJlc3BvbnNlLl90b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBBcGlCYXNlLnByb3RvdHlwZS5fY29tbXVuaWNhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhbGVydChcIumAmuS/oeOCqOODqeODvFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwaUJhc2UucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge307XHJcbiAgICAgICAgICAgIGRhdGEuX3Rva2VuID0gdGhpcy5fdG9rZW47XHJcbiAgICAgICAgICAgIHJldHVybiAkLmFqYXgodXJsLCB7IHR5cGU6ICdnZXQnLCBkYXRhOiBkYXRhLCBzdWNjZXNzOiBjYWxsYmFjayB9KS50aGVuKHRoaXMuX3ByZVByb2Nlc3MsIHRoaXMuX2NvbW11bmljYXRpb25FcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHRVQg44Oq44Kv44Ko44K544OI44KS6YCB5L+hXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQXBpQmFzZS5wcm90b3R5cGUuX3Bvc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCAkZmlsZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSAkLmV4dGVuZCh7IF90b2tlbjogdGhpcy5fdG9rZW4gfSwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICgkZmlsZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydfcmVzcG9uc2VfYXMnXSA9ICd0ZXh0L2h0bWwnO1xyXG4gICAgICAgICAgICAgICAgJGZpbGVzLnVwbG9hZCh1cmwsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aChkZmQsIFtyZXNwb25zZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZmQudGhlbih0aGlzLl9wcmVQcm9jZXNzLCB0aGlzLl9jb21tdW5pY2F0aW9uRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YVsnX3Jlc3BvbnNlX2FzJ10gPSAnYXBwbGljYXRpb24vanNvbic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5hamF4KHVybCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKHRoaXMuX3ByZVByb2Nlc3MsIHRoaXMuX2NvbW11bmljYXRpb25FcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwaUJhc2UucHJvdG90eXBlLl9zZXJpYWxpemUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4ga28udXRpbHMuc3RyaW5naWZ5SnNvbihkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBBcGlCYXNlO1xyXG4gICAgfSkoKTtcclxuICAgIHJldHVybiBBcGlCYXNlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBpQmFzZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvQXBpQmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnZGkvRGVwZW5kZW5jeUluamVjdGFibGUnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIEluamVjdGFibGUpIHtcclxuICAgIHZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhDb21wb25lbnQsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcG9uZW50LnJlZ2lzdGVyID0gZnVuY3Rpb24gKG5hbWUsIGtsYXNzLCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKG5hbWUsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIHZpZXdNb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVZpZXdNb2RlbDogZnVuY3Rpb24gKHBhcmFtcywgY29tcG9uZW50SW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zIGluc3RhbmNlb2Yga2xhc3MgPyBwYXJhbXMgOiBrby51bndyYXAocGFyYW1zLm9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBDb21wb25lbnQ7XHJcbiAgICB9KShJbmplY3RhYmxlKTtcclxuICAgIHJldHVybiBDb21wb25lbnQ7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wb25lbnQuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL0NvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vUGFnZSddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgUGFnZSkge1xyXG4gICAgdmFyIGNvbXBvbmVudElkID0gJ2hvbWUtcGFnZSc7XHJcbiAgICB2YXIgSG9tZVBhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhIb21lUGFnZSwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBIb21lUGFnZSgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkhvbWVcIjtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJZCA9IGNvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSG9tZVBhZ2UuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSA9IG5ldyBIb21lUGFnZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSG9tZVBhZ2UuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBIb21lUGFnZTtcclxuICAgIH0pKFBhZ2UpO1xyXG4gICAgcmVxdWlyZSgnLi9Ib21lUGFnZS5sZXNzJyk7XHJcbiAgICBQYWdlLnJlZ2lzdGVyKGNvbXBvbmVudElkLCBIb21lUGFnZSwgcmVxdWlyZSgnLi9Ib21lUGFnZS5odG1sJykpO1xyXG4gICAgcmV0dXJuIEhvbWVQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SG9tZVBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvaG9tZS9Ib21lUGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vUGFnZScsICcuLi9QYXJ0aWFsVmlld01vZGVsJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBQYWdlLCBQYXJ0aWFsVmlld01vZGVsKSB7XHJcbiAgICB2YXIgY29tcG9uZW50SWQgPSBcInNldHRpbmdzLXBhZ2VcIjtcclxuICAgIHZhciBTZXR0aW5nc1BhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhTZXR0aW5nc1BhZ2UsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gU2V0dGluZ3NQYWdlKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWRpdG9yID0gbmV3IFByb2ZpbGVFZGl0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXNzd29yZENoYW5nZXIgPSBuZXcgUGFzc3dvcmRDaGFuZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldHRpbmdzUGFnZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlID0gbmV3IFNldHRpbmdzUGFnZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU2V0dGluZ3NQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWRpdG9yLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRDaGFuZ2VyLnJlc2V0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTZXR0aW5nc1BhZ2UuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBTZXR0aW5nc1BhZ2U7XHJcbiAgICB9KShQYWdlKTtcclxuICAgIFBhZ2UucmVnaXN0ZXIoY29tcG9uZW50SWQsIFNldHRpbmdzUGFnZSwgcmVxdWlyZSgnLi9TZXR0aW5nc1BhZ2UuaHRtbCcpKTtcclxuICAgIHZhciBQcm9maWxlRWRpdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoUHJvZmlsZUVkaXRvciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQcm9maWxlRWRpdG9yKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJvZmlsZUVkaXRvci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zYXZpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5kYW5nZXIoXCLlpLHmlZdcIiwgcmVzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLnN1Y2Nlc3MoXCLlrozkuoZcIiwgXCLjg5fjg63jg5XjgqHjgqTjg6vjgpLmm7TmlrDjgZfjgb7jgZfjgZ9cIik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseSgpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvZmlsZUVkaXRvci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucmVzb3VyY2VzLnVzZXIubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLnJlc291cmNlcy51c2VyLmVtYWlsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9maWxlRWRpdG9yLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMudXNlci5uYW1lID0gdGhpcy5wcm9maWxlLm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzLnVzZXIuZW1haWwgPSB0aGlzLnByb2ZpbGUuZW1haWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUHJvZmlsZUVkaXRvcjtcclxuICAgIH0pKFBhcnRpYWxWaWV3TW9kZWwpO1xyXG4gICAgdmFyIFBhc3N3b3JkQ2hhbmdlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFBhc3N3b3JkQ2hhbmdlciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQYXNzd29yZENoYW5nZXIoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5uZXdfcGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VyLnByb3RvdHlwZS5jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld19wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZF9jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ZXIud2FybmluZyhcIuOCqOODqeODvFwiLCBcIueiuuiqjeODkeOCueODr+ODvOODieOBjOS4gOiHtOOBl+OBvuOBm+OCk1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNhdmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpLnN1Y2Nlc3NEdW1teSgpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLmRhbmdlcihcIuWkseaVl1wiLCByZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuc3VjY2VzcyhcIuWujOS6hlwiLCBcIuODkeOCueODr+ODvOODieOCkuWkieabtOOBl+OBvuOBl+OBn1wiKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYXNzd29yZENoYW5nZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5uZXdfcGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFBhc3N3b3JkQ2hhbmdlcjtcclxuICAgIH0pKFBhcnRpYWxWaWV3TW9kZWwpO1xyXG4gICAgcmV0dXJuIFNldHRpbmdzUGFnZTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNldHRpbmdzUGFnZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL1BhZ2UnLCAnLi4vUGFydGlhbFZpZXdNb2RlbCcsICcuLi8uLi9wYXJ0cy9WYWxpZGF0aW9uJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBQYWdlLCBQYXJ0aWFsVmlld01vZGVsLCBWYWxpZGF0aW9uKSB7XHJcbiAgICB2YXIgY29tcG9uZW50SWQgPSAndXNlci1wYWdlJztcclxuICAgIHZhciBVc2VyUGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFVzZXJQYWdlLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFVzZXJQYWdlKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBuZXcgVXNlckVkaXRvcih1c2VyKTtcclxuICAgICAgICAgICAgICAgIHZhciBleGVjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci52YWxpZGF0aW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlZGl0b3IudmFsaWRhdGlvbi5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tb2RhbC5hY3Rpb25TdXNwZW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuZGFuZ2VyKCfjgqjjg6njg7wnLCByZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuc3VjY2Vzcygn5a6M5LqGJywgJ+ODpuODvOOCtuaDheWgseOCkuabtOaWsOOBl+OBvuOBl+OBnycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuc2V0SGVhZGVyKCfjg6bjg7zjgrbnt6jpm4YnKS5zZXRDdXN0b21Cb2R5KCd1c2VyRWRpdG9yTW9kYWxCb2R5JywgZWRpdG9yKS5zZXRGb290ZXIoZXhlYywgJ+S/neWtmCcsICfjgq3jg6Pjg7Pjgrvjg6snKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHVzZXIuZW5hYmxlZCA9ICF1c2VyLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcGkuc3VjY2Vzc0R1bW15KCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5lcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleGVjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmFjdGlvblN1c3BlbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBpLnN1Y2Nlc3NEdW1teSgpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5lcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmFjdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLnNldEhlYWRlcign44Om44O844K25YmK6ZmkJykuc2V0Qm9keSh1c2VyLm5hbWUgKyAnIChpZDonICsgdXNlci5sb2dpbiArICcpIOOCkuWJiumZpOOBl+OBvuOBmeOAgjxicj7mnKzlvZPjgavjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ8nKS5zZXRGb290ZXIoZXhlYywgJ+OBr+OBhCcsICfjgYTjgYTjgYgnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVzZXJQYWdlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlclBhZ2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFVzZXJzKCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy51c2VycyA9IHJlcy51c2VycztcclxuICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVc2VyUGFnZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZWRpdG9yID0gbmV3IFVzZXJFZGl0b3IoKTtcclxuICAgICAgICAgICAgdmFyIGV4ZWMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0b3IudmFsaWRhdGlvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlZGl0b3IudmFsaWRhdGlvbi5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLmRhbmdlcign44Ko44Op44O8JywgcmVzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5zdWNjZXNzKCflrozkuoYnLCAn44Om44O844K244KS6L+95Yqg44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbC5zZXRIZWFkZXIoJ+ODpuODvOOCtui/veWKoCcpLnNldEN1c3RvbUJvZHkoJ3VzZXJFZGl0b3JNb2RhbEJvZHknLCBlZGl0b3IpLnNldEZvb3RlcihleGVjLCAn6L+95YqgJywgJ+OCreODo+ODs+OCu+ODqycpLnNob3coKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gVXNlclBhZ2U7XHJcbiAgICB9KShQYWdlKTtcclxuICAgIHZhciBVc2VyRWRpdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoVXNlckVkaXRvciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBVc2VyRWRpdG9yKHVzZXIpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyYW5jZV9vcHRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgeyBrZXk6ICdjb250YWN0JywgbmFtZTogJ+WVj+OBhOWQiOOCj+OBmycgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiAnbWVtYmVyJywgbmFtZTogJ+S8muWToeeuoeeQhicgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gdXNlciA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0ga28udXRpbHMuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgbG9naW46ICcnLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJycsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2xlYXJhbmNlczogW11cclxuICAgICAgICAgICAgfSwgdXNlciA/IHVzZXIgOiB7fSk7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMudXNlcik7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlcjtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gbmV3IFZhbGlkYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbG9naW46IGtvLmdldE9ic2VydmFibGUodXNlciwgJ2xvZ2luJykuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfnhKHlirnjgarjg6bjg7zjgrZJROOBp+OBmScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogJ15bYS16QS1aMC05X10rJCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBrby5nZXRPYnNlcnZhYmxlKHVzZXIsICdwYXNzd29yZCcpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICF0aGlzLmVkaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogNjRcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybToga28uZ2V0T2JzZXJ2YWJsZSh0aGlzLCAncGFzc3dvcmRfY29uZmlybScpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICF0aGlzLmVkaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXF1YWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBrby5nZXRPYnNlcnZhYmxlKHVzZXIsICdwYXNzd29yZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAn44OR44K544Ov44O844OJ44GM5LiA6Ie044GX44G+44Gb44KTJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmFtZToga28uZ2V0T2JzZXJ2YWJsZSh1c2VyLCAnbmFtZScpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBlbWFpbDoga28uZ2V0T2JzZXJ2YWJsZSh1c2VyLCAnZW1haWwnKS5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogMjU1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXNlckVkaXRvci5wcm90b3R5cGUuaGFzQ2xlYXJhbmNlT2YgPSBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLmNsZWFyYW5jZXMuaW5kZXhPZihpZGVudGlmaWVyKSA+PSAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXNlckVkaXRvci5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBVc2VyRWRpdG9yO1xyXG4gICAgfSkoUGFydGlhbFZpZXdNb2RlbCk7XHJcbiAgICBQYWdlLnJlZ2lzdGVyKGNvbXBvbmVudElkLCBVc2VyUGFnZSwgcmVxdWlyZSgnLi9Vc2VyUGFnZS5odG1sJykpO1xyXG4gICAgcmV0dXJuIFVzZXJQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXNlclBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvdXNlci9Vc2VyUGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibmF2YmFyLWRlZmF1bHQgc2lkZWJhclxcXCIgcm9sZT1cXFwibmF2aWdhdGlvblxcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwic2lkZWJhci1uYXYgbmF2YmFyLWNvbGxhcHNlXFxcIj5cXHJcXG5cXHRcXHQ8dWwgY2xhc3M9XFxcIm5hdlxcXCIgaWQ9XFxcInNpZGUtbWVudVxcXCI+XFxyXFxuXFx0XFx0XFx0e3sjZm9yZWFjaCBtZW51fX1cXHJcXG5cXHRcXHRcXHQ8bGk+XFxyXFxuXFx0XFx0XFx0XFx0PGEgaHJlZj1cXFwiI3t7cGF0aH19XFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IGFjdGl2ZTogJHBhcmVudHNbMV0ubWVudUlkID09IG5hbWUgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXt7aWNvbn19XFxcIj48L2k+IHt7bGFiZWx9fVxcclxcblxcdFxcdFxcdFxcdDwvYT5cXHJcXG5cXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdFxcdHt7L2ZvcmVhY2h9fVxcclxcblxcdFxcdDwvdWw+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibmF2YmFyLWhlYWRlclxcXCI+XFxyXFxuXFx0PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJuYXZiYXItdG9nZ2xlXFxcIiBkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiIGRhdGEtdGFyZ2V0PVxcXCIubmF2YmFyLWNvbGxhcHNlXFxcIj5cXHJcXG5cXHRcXHQ8c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XFxyXFxuXFx0XFx0PHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxyXFxuXFx0XFx0PHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxyXFxuXFx0XFx0PHNwYW4gY2xhc3M9XFxcImljb24tYmFyXFxcIj48L3NwYW4+XFxyXFxuXFx0PC9idXR0b24+XFxyXFxuXFx0PGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZFxcXCIgaHJlZj1cXFwiLi9cXFwiPnt7IHJlc291cmNlcy5jb25maWcubGFiZWwuYXBwX3RpdGxlIH19PC9hPlxcclxcbjwvZGl2PjwhLS0gLy5uYXZiYXItaGVhZGVyIC0tPlxcclxcblxcclxcbjx1bCBjbGFzcz1cXFwibmF2IG5hdmJhci10b3AtbGlua3MgbmF2YmFyLXJpZ2h0XFxcIj5cXHJcXG5cXHQ8bGkgY2xhc3M9XFxcImRyb3Bkb3duXFxcIj5cXHJcXG5cXHRcXHQ8YSBjbGFzcz1cXFwiZHJvcGRvd24tdG9nZ2xlXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGhyZWY9XFxcIiNcXFwiPlxcclxcblxcdFxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS11c2VyIGZhLWZ3XFxcIj48L2k+IHt7IHJlc291cmNlcy51c2VyLm5hbWUgfX0gPGkgY2xhc3M9XFxcImZhIGZhLWNhcmV0LWRvd25cXFwiPjwvaT5cXHJcXG5cXHRcXHQ8L2E+XFxyXFxuXFx0XFx0PHVsIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLXVzZXJcXFwiPlxcclxcblxcdFxcdFxcdDxsaT48YSBocmVmPVxcXCIjc2V0dGluZ3NcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1nZWFyIGZhLWZ3XFxcIj48L2k+IOOCouOCq+OCpuODs+ODiOioreWumjwvYT48L2xpPlxcclxcblxcdFxcdFxcdHt7I2lmIHJlc291cmNlcy51c2VyLmlzX21hc3Rlcn19XFxyXFxuXFx0XFx0XFx0PGxpPjxhIGhyZWY9XFxcIiN1c2VyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdXNlcnMgZmEtZndcXFwiPjwvaT4g44Om44O844K2566h55CGPC9hPjwvbGk+XFxyXFxuXFx0XFx0XFx0e3svaWZ9fVxcclxcblxcdFxcdFxcdDxsaSBjbGFzcz1cXFwiZGl2aWRlclxcXCI+PC9saT5cXHJcXG5cXHRcXHRcXHQ8bGk+PGEgaHJlZj1cXFwiI1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNpZ24tb3V0IGZhLWZ3XFxcIj48L2k+IOODreOCsOOCouOCpuODiDwvYT48L2xpPlxcclxcblxcdFxcdDwvdWw+PCEtLSAvLmRyb3Bkb3duLXVzZXIgLS0+XFxyXFxuXFx0PC9saT48IS0tIC8uZHJvcGRvd24gLS0+XFxyXFxuPC91bD48IS0tIC8ubmF2YmFyLXRvcC1saW5rcyAtLT5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvaGVhZGVyLW5hdi9IZWFkZXJOYXYuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vQ29tcG9uZW50J10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBDb21wb25lbnQpIHtcclxuICAgIHZhciBQYWdlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoUGFnZSwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQYWdlKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog44Oa44O844K45ZCN44KS5Y+W5b6X44GZ44KL44Oh44K944OD44OJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUGFnZS5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXROYW1lIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDjg5rjg7zjgrjjgZTjgajjga7jg4bjg7Pjg5fjg6zjg7zjg4hJROOCkuWPluW+l+OBmeOCi+ODoeOCveODg+ODiVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFBhZ2UucHJvdG90eXBlLmdldFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFRlbXBsYXRlIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDpgbfnp7vlvozjgavlkbzjgbPlh7rjgZXjgozjgovjgqTjg5njg7Pjg4jjg6Hjgr3jg4Pjg4lcclxuICAgICAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFBhZ2UucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUGFnZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhY3RvcnkgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBQYWdlO1xyXG4gICAgfSkoQ29tcG9uZW50KTtcclxuICAgIHJldHVybiBQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFnZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFnZS9QYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9kaS9EZXBlbmRlbmN5SW5qZWN0YWJsZSddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgSW5qZWN0YWJsZSkge1xyXG4gICAgdmFyIFBhcnRpYWxWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhQYXJ0aWFsVmlld01vZGVsLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFBhcnRpYWxWaWV3TW9kZWwoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUGFydGlhbFZpZXdNb2RlbDtcclxuICAgIH0pKEluamVjdGFibGUpO1xyXG4gICAgcmV0dXJuIFBhcnRpYWxWaWV3TW9kZWw7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYXJ0aWFsVmlld01vZGVsLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWdlL1BhcnRpYWxWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIFZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFZhbGlkYXRpb24odmFsaWRhdGVkVmlld01vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbF9lcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnZhbGlkYXRlZFZpZXdNb2RlbC5pc1ZhbGlkKCkgJiYgX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy52YWxpZGF0ZWRWaWV3TW9kZWwoKS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIV90aGlzLnZhbGlkYXRlZFZpZXdNb2RlbCgpW2ZpZWxkXS5pc1ZhbGlkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBFbnVtZXJhYmxlLmZyb20oX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMpLmZpcnN0T3JEZWZhdWx0KGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmZpZWxkID09PSBmaWVsZDsgfSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFcnJvciA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5hY3RpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudmFsaWRhdGVkVmlld01vZGVsKCkuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGVkVmlld01vZGVsKClbZmllbGRdKCk7IC8vIOWkieabtOOCkuaknOefpeOBmeOCi+OBn+OCgeOBq+WPgueFp+OBl+OBpuOBiuOBj1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy52YWxpZGF0ZWRWaWV3TW9kZWwoKVtmaWVsZF0uZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBFbnVtZXJhYmxlLmZyb20oX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMpLmZpcnN0T3JEZWZhdWx0KGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmZpZWxkID09PSBmaWVsZDsgfSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWklumDqOOBp+aknOafu+OBl+OBn+e1kOaenOeZuueUn+OBl+OBn+OCqOODqeODvOOCkui/veWKoOioreWumuOBmeOCi1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZmllbGRcclxuICAgICAgICAgICAgICogQHBhcmFtIGVycm9yXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnNldEFkZGl0aW9uYWxFcnJvciA9IGZ1bmN0aW9uIChmaWVsZCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZGl0aW9uYWxfZXJyb3JzLnB1c2goeyBmaWVsZDogZmllbGQsIG1lc3NhZ2U6IGVycm9yIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aSW6YOo44Ko44Op44O844KS44Kv44Oq44KiXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQWRkaXRpb25hbEVycm9ycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZGl0aW9uYWxfZXJyb3JzID0gW107XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlZFZpZXdNb2RlbCA9IGtvLnZhbGlkYXRlZE9ic2VydmFibGUodmFsaWRhdGVkVmlld01vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFZhbGlkYXRpb247XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb247XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1WYWxpZGF0aW9uLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9WYWxpZGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+XFxyXFxuXFx0XFx0PGgxIGNsYXNzPVxcXCJwYWdlLWhlYWRlclxcXCI+44Ki44Kr44Km44Oz44OI6Kit5a6aPC9oMT5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcclxcblxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy02XFxcIj5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nIGNsZWFyZml4XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHTjg6bjg7zjgrboqK3lrppcXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIiBkYXRhLWJpbmQ9XFxcIndpdGg6IHByb2ZpbGVFZGl0b3JcXFwiPlxcclxcblxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8cD7jg6bjg7zjgrZJRDoge3sgcmVzb3VyY2VzLnVzZXIubG9naW4gfX08L3A+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHA+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx044Kv44Oq44Ki44Op44Oz44K5OiBcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR7eyNpZiByZXNvdXJjZXMudXNlci5pc19tYXN0ZXJ9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1pbmZvXFxcIj5tYXN0ZXI8L3NwYW4+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0e3svaWZ9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7I2Vsc2V9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7I2ZvcmVhY2g6IHJlc291cmNlcy51c2VyLmNsZWFyYW5jZXN9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1zdWNjZXNzXFxcIj57eyAkZGF0YSB9fTwvc3Bhbj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR7ey9mb3JlYWNofX1cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR7ey9lbHNlfX1cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwibmFtZVxcXCI+44Om44O844K25ZCNPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcIm5hbWVcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IHByb2ZpbGUubmFtZVxcXCIvPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxsYWJlbCBmb3I9XFxcImVtYWlsXFxcIj7jg6Hjg7zjg6vjgqLjg4njg6zjgrk8L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJlbWFpbFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImVtYWlsXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBwcm9maWxlLmVtYWlsXFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogc2F2ZSwgZGlzYWJsZTogc2F2aW5nXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHTlpInmm7R7eyNpZiBzYXZpbmd9fSA8aSBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXFxcIj48L2k+IHt7L2lmfX1cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2J1dHRvbj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctNlxcXCI+XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZyBjbGVhcmZpeFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx044OR44K544Ov44O844OJ5aSJ5pu0XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCIgZGF0YS1iaW5kPVxcXCJ3aXRoOiBwYXNzd29yZENoYW5nZXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcclxcblxcdFxcdFxcdFxcdDxwPlxcclxcblxcdFxcdFxcdFxcdFxcdOODkeOCueODr+ODvOODieOBr+WNiuinkjjlrZfku6XkuIrjgafjgIHlsI/mloflrZcsIOWkp+aWh+Wtlywg5pWw5a2XLCDoqJjlj7fjga7jgYbjgaHjgYTjgZrjgozjgYsy56iu6aGe5Lul5LiK44Gu5paH5a2X44KS5L2/44GG5b+F6KaB44GM44GC44KK44G+44GZ44CCXFxyXFxuXFx0XFx0XFx0XFx0PC9wPlxcclxcblxcclxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8bGFiZWw+54++5Zyo44Gu44OR44K544Ov44O844OJPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IHBhc3N3b3JkXFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGxhYmVsPuaWsOOBl+OBhOODkeOCueODr+ODvOODiTwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiBuZXdfcGFzc3dvcmRcXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8bGFiZWw+5paw44GX44GE44OR44K544Ov44O844OJ77yI56K66KqN44Gu44Gf44KB44KC44GG5LiA5bqm5YWl5Yqb44GX44Gm44GP44Gg44GV44GE77yJPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IHBhc3N3b3JkX2NvbmZpcm1cXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBjaGFuZ2UsIGRpc2FibGU6IHNhdmluZ1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx05aSJ5pu0e3sjaWYgc2F2aW5nfX0gPGkgY2xhc3M9XFxcImZhIGZhLXNwaW5uZXIgZmEtc3BpblxcXCI+PC9pPiB7ey9pZn19XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9idXR0b24+XFxyXFxuXFxyXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2Uvc2V0dGluZ3MvU2V0dGluZ3NQYWdlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj5cXHJcXG5cXHRcXHQ8aDEgY2xhc3M9XFxcInBhZ2UtaGVhZGVyXFxcIj57e3RpdGxlfX08L2gxPlxcclxcblxcdFxcdDxwPk5vIGNvbnRlbnQ8L3A+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvaG9tZS9Ib21lUGFnZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+XFxyXFxuXFx0XFx0XFxyXFxuXFx0XFx0PGgxIGNsYXNzPVxcXCJwYWdlLWhlYWRlclxcXCI+44Om44O844K2566h55CGPC9oMT5cXHJcXG5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nIGNsZWFyZml4XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicHVsbC1yaWdodFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICB7eyNpZiBsb2FkaW5nfX0gPGkgY2xhc3M9XFxcImZhIGZhLXNwaW5uZXIgZmEtc3BpblxcXCI+PC9pPiB7ey9pZn19XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IGFkZFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXVzZXJcXFwiPjwvaT4g44Om44O844K26L+95YqgXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFx0XFx0XFx0PHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1ob3ZlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PHRoZWFkPlxcclxcblxcdFxcdFxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+SUQ8L3RoPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aD7lkI3liY08L3RoPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aD7nirbmhYs8L3RoPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aD7nrqHnkIY8L3RoPlxcclxcblxcdFxcdFxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0XFx0XFx0PC90aGVhZD5cXHJcXG5cXHRcXHRcXHRcXHQ8dGJvZHkgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiB1c2Vyc1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PHRyIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQuZWRpdFxcXCIgc3R5bGU9XFxcImN1cnNvcjogcG9pbnRlcjtcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD57eyBsb2dpbiB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRkPnt7IG5hbWUgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtaW5mb1xcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiBpc19tYXN0ZXJcXFwiPm1hc3Rlcjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibGFiZWwgbGFiZWwtc3VjY2Vzc1xcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiBlbmFibGVkXFxcIj7mnInlirk8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWRlZmF1bHRcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogIWVuYWJsZWRcXFwiPuWBnOatouS4rTwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I2lmIGlkICE9PSAkcGFyZW50LnJlc291cmNlcy51c2VyLmlkfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXAgYnRuLWdyb3VwLXhzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LnRvZ2dsZUVuYWJsZWQsIGNsaWNrQnViYmxlOiBmYWxzZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyNpZiBlbmFibGVkfX0gPGkgY2xhc3M9XFxcImZhIGZhLWJhblxcXCI+PC9pPiDlgZzmraIge3svaWZ9fVxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sjZWxzZX19IDxpIGNsYXNzPVxcXCJmYSBmYS1yZWN5Y2xlXFxcIj48L2k+IOacieWKueWMliB7ey9lbHNlfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5yZW1vdmUsIGNsaWNrQnViYmxlOiBmYWxzZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2hcXFwiPjwvaT4g5YmK6ZmkXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L2lmfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNlbHNlfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICDjg63jgrDjgqTjg7PkuK1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9lbHNlfX1cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L3RkPlxcclxcblxcdFxcdFxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0XFx0XFx0PC90Ym9keT5cXHJcXG5cXHRcXHRcXHQ8L3RhYmxlPlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcclxcblxcdDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcdFxcdFxcdFxcdFxcclxcbjwhLS0g44Om44O844K26L+95Yqg44OA44Kk44Ki44Ot44Kw44OG44Oz44OX44Os44O844OIIC0tPlxcclxcbjxzY3JpcHQgdHlwZT1cXFwidGV4dC9odG1sXFxcIiBpZD1cXFwidXNlckVkaXRvck1vZGFsQm9keVxcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHJcXG5cXHRcXHR7eyNpZiBlZGl0fX1cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3ZWxsIHdlbGwtc21cXFwiPuODkeOCueODr+ODvOODieOCkuWkieabtOOBl+OBquOBhOWgtOWQiOOBr+ODkeOCueODr+ODvOODieashOOCkuepuuOBq+OBl+OBpuOBj+OBoOOBleOBhOOAgjwvZGl2PlxcclxcblxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHRcXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6eyBoYXMtZXJyb3I6IHZhbGlkYXRpb24uaGFzRXJyb3IoJ2xvZ2luJykgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwibG9naW5cXFwiIGRhdGEtYmluZD1cXFwiY3NzOnsgbmVjZXNzYXJ5LWZpZWxkOiAhZWRpdCB9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHTjg6bjg7zjgrZJRCA8c21hbGw+5Y2K6KeS6Iux5pWwLOOCouODs+ODgOODvOOCueOCs+OCoihfKTwvc21hbGw+XFxyXFxuXFx0XFx0XFx0XFx0PC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgaWQ9XFxcImxvZ2luXFxcIiBwbGFjZWhvbGRlcj1cXFwidXNlcl9pZFxcXCIgXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHZhbHVlPVxcXCJ7eyB1c2VyLmxvZ2luIH19XFxcIiBkYXRhLWJpbmQ9XFxcImRpc2FibGU6IGVkaXRcXFwiIC8+XFxyXFxuXFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1kYW5nZXJcXFwiPnt7IHZhbGlkYXRpb24uZ2V0RXJyb3IoJ2xvZ2luJykgfX08L3NwYW4+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6eyBoYXMtZXJyb3I6IHZhbGlkYXRpb24uaGFzRXJyb3IoJ25hbWUnKSB9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGFiZWwgZm9yPVxcXCJuYW1lXFxcIiBjbGFzcz1cXFwibmVjZXNzYXJ5LWZpZWxkXFxcIj7lkI3liY08L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdDxpbnB1dCBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBpZD1cXFwibmFtZVxcXCIgdmFsdWU9XFxcInt7IHVzZXIubmFtZSB9fVxcXCJcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgcGxhY2Vob2xkZXI9XFxcInt7IHJlc291cmNlcy5jb25maWcubGFiZWwucHJvdmlkZXIgfX1cXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWRhbmdlclxcXCI+e3sgdmFsaWRhdGlvbi5nZXRFcnJvcignbmFtZScpIH19PC9zcGFuPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcclxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImNvbC1tZC02XFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyBoYXMtZXJyb3I6IHZhbGlkYXRpb24uaGFzRXJyb3IoJ3Bhc3N3b3JkJykgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwicGFzc3dvcmRcXFwiIGRhdGEtYmluZD1cXFwiY3NzOnsgbmVjZXNzYXJ5LWZpZWxkOiAhZWRpdCB9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHTjg5Hjgrnjg6/jg7zjg4kgPHNtYWxsPuWNiuinkuiLseaVsCzoqJjlj7cgOOWtl+S7peS4ijwvc21hbGw+XFxyXFxuXFx0XFx0XFx0XFx0PC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGlkPVxcXCJwYXNzd29yZFxcXCJcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgdmFsdWU9XFxcInt7IHVzZXIucGFzc3dvcmQgfX1cXFwiIHBsYWNlaG9sZGVyPVxcXCLil4/il4/il4/il4/il4/il4/il4/il49cXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWRhbmdlclxcXCI+e3sgdmFsaWRhdGlvbi5nZXRFcnJvcigncGFzc3dvcmQnKSB9fTwvc3Bhbj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczogeyBoYXMtZXJyb3I6IHZhbGlkYXRpb24uaGFzRXJyb3IoJ3Bhc3N3b3JkX2NvbmZpcm0nKSB9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGFiZWwgZm9yPVxcXCJwYXNzd29yZF9jb25maXJtXFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IG5lY2Vzc2FyeS1maWVsZDogIWVkaXQgfVxcXCI+44OR44K544Ov44O844OJ77yI56K66KqN77yJPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGlkPVxcXCJwYXNzd29yZF9jb25maXJtXFxcIlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCB2YWx1ZT1cXFwie3sgcGFzc3dvcmRfY29uZmlybSB9fVxcXCIgcGxhY2Vob2xkZXI9XFxcIuKXj+KXj+KXj+KXj+KXj+KXj+KXj+KXj1xcXCIvPlxcclxcblxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtZGFuZ2VyXFxcIj57eyB2YWxpZGF0aW9uLmdldEVycm9yKCdwYXNzd29yZF9jb25maXJtJykgfX08L3NwYW4+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFxyXFxuXFx0PC9kaXY+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHRcXHRcXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOnsgaGFzLWVycm9yOiB2YWxpZGF0aW9uLmhhc0Vycm9yKCdlbWFpbCcpIH1cXFwiPlxcclxcblxcdFxcdFxcdFxcdDxsYWJlbCBmb3I9XFxcImVtYWlsXFxcIj7jg6Hjg7zjg6vjgqLjg4njg6zjgrk8L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdDxpbnB1dCBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiB0eXBlPVxcXCJlbWFpbFxcXCIgaWQ9XFxcImVtYWlsXFxcIiBkYXRhLWJpbmQ9XFxcInZhbHVlOiB1c2VyLmVtYWlsXFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1kYW5nZXJcXFwiPnt7IHZhbGlkYXRpb24uZ2V0RXJyb3IoJ2VtYWlsJykgfX08L3NwYW4+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGg0PuS9v+eUqOOCkuioseWPr+OBmeOCi+apn+iDvTwvaDQ+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBidG4tZ3JvdXAgYnRuLWdyb3VwLXNtXFxcIiBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGNsZWFyYW5jZV9vcHRpb25zXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGFiZWwgY2xhc3M9XFxcImJ0blxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6e1xcclxcblxcdFxcdFxcdFxcdFxcdFxcdCdidG4tZGVmYXVsdCc6ICEkcGFyZW50Lmhhc0NsZWFyYW5jZU9mKGtleSksXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0J2J0bi1wcmltYXJ5IGFjdGl2ZSc6ICRwYXJlbnQuaGFzQ2xlYXJhbmNlT2Yoa2V5KVxcclxcblxcdFxcdFxcdFxcdFxcdH1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiB2YWx1ZT1cXFwie3sga2V5IH19XFxcIiBkYXRhLWJpbmQ9XFxcImNoZWNrZWQ6ICRwYXJlbnQudXNlci5jbGVhcmFuY2VzXFxcIi8+e3sgbmFtZSB9fVxcclxcblxcdFxcdFxcdFxcdDwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9zY3JpcHQ+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvdXNlci9Vc2VyUGFnZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxcc2lkZS1uYXZcXFxcU2lkZU5hdi5sZXNzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxzdHlsZS1sb2FkZXJcXFxcYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcbGVzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxwYXJ0c1xcXFxzaWRlLW5hdlxcXFxTaWRlTmF2Lmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxcc2lkZS1uYXZcXFxcU2lkZU5hdi5sZXNzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9zaWRlLW5hdi9TaWRlTmF2Lmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9wYXJ0cy9zaWRlLW5hdi9TaWRlTmF2Lmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcbGVzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxwYWdlXFxcXGhvbWVcXFxcSG9tZVBhZ2UubGVzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcc3R5bGUtbG9hZGVyXFxcXGFkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFnZVxcXFxob21lXFxcXEhvbWVQYWdlLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFnZVxcXFxob21lXFxcXEhvbWVQYWdlLmxlc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvaG9tZS9Ib21lUGFnZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGNzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vcGFnZS9ob21lL0hvbWVQYWdlLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzSUU5ID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSA5XFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzSUU5KCk7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlVGV4dChzb3VyY2UsIGlkLCByZXBsYWNlbWVudCkge1xyXG5cdHZhciBib3VuZGFyaWVzID0gW1wiLyoqID4+XCIgKyBpZCArIFwiICoqL1wiLCBcIi8qKiBcIiArIGlkICsgXCI8PCAqKi9cIl07XHJcblx0dmFyIHN0YXJ0ID0gc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pO1xyXG5cdHZhciB3cmFwcGVkUmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudFxyXG5cdFx0PyAoYm91bmRhcmllc1swXSArIHJlcGxhY2VtZW50ICsgYm91bmRhcmllc1sxXSlcclxuXHRcdDogXCJcIjtcclxuXHRpZiAoc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pID49IDApIHtcclxuXHRcdHZhciBlbmQgPSBzb3VyY2UubGFzdEluZGV4T2YoYm91bmRhcmllc1sxXSkgKyBib3VuZGFyaWVzWzFdLmxlbmd0aDtcclxuXHRcdHJldHVybiBzb3VyY2Uuc2xpY2UoMCwgc3RhcnQpICsgd3JhcHBlZFJlcGxhY2VtZW50ICsgc291cmNlLnNsaWNlKGVuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzb3VyY2UgKyB3cmFwcGVkUmVwbGFjZW1lbnQ7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQsIGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdFx0Y3NzID0gXCJAaW1wb3J0IHVybChcXFwiZGF0YTpzdHlsZXNoZWV0L2NzcztiYXNlNjQsXCIgKyBidG9hKGNzcykgKyBcIlxcXCIpXCI7XHJcblx0XHR9IGNhdGNoKGUpIHt9XHJcblx0fVxyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9QYWdlJywgJy4uLy4uL3BhcnRzL3BhZ2VyL1BhZ2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBQYWdlLCBQYWdlcikge1xyXG4gICAgdmFyIGNvbXBvbmVudElkID0gJ2NvbnRhY3QtcGFnZSc7XHJcbiAgICB2YXIgQ29udGFjdFBhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhDb250YWN0UGFnZSwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBDb250YWN0UGFnZSgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkNvbnRhY3RcIjtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhZ2VyLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYXBpLmdldE1lc3NhZ2VzKF90aGlzLnBhZ2VyLm9mZnNldCwgX3RoaXMucGFnZXIuc2l6ZSkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFnZXIuY291bnQgPSByZXMuY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubWVzc2FnZXMgPSByZXMubWVzc2FnZXM7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBhZ2VyLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuc2V0SGVhZGVyKCfjg6Hjg4Pjgrvjg7zjgrgnKS5zZXRDdXN0b21Cb2R5KCdtZXNzYWdlTW9kYWxCb2R5JywgbWVzc2FnZSkuc2V0Rm9vdGVyKG51bGwsICcnLCAn6ZaJ44GY44KLJykuc2hvdygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudElkID0gY29tcG9uZW50SWQ7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VyID0gbmV3IFBhZ2VyKGtvLmdldE9ic2VydmFibGUodGhpcywgJ21lc3NhZ2VzJyksIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29udGFjdFBhZ2UuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSA9IG5ldyBDb250YWN0UGFnZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQ29udGFjdFBhZ2UucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBrby5jb21wdXRlZCh0aGlzLnJlbG9hZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBDb250YWN0UGFnZS5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIENvbnRhY3RQYWdlO1xyXG4gICAgfSkoUGFnZSk7XHJcbiAgICBQYWdlLnJlZ2lzdGVyKGNvbXBvbmVudElkLCBDb250YWN0UGFnZSwgcmVxdWlyZSgnLi9Db250YWN0UGFnZS5odG1sJykpO1xyXG4gICAgcmV0dXJuIENvbnRhY3RQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29udGFjdFBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvY29udGFjdC9Db250YWN0UGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vLi4vQ29tcG9uZW50J10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBDb21wb25lbnQpIHtcclxuICAgIHZhciBQYWdlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFBhZ2VyLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFBhZ2VyKGl0ZW1zLCBzaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlSW5wdXQgPSAxO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICAgICAga28uZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhZ2VzJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gTWF0aC5jZWlsKF90aGlzLmNvdW50IC8gX3RoaXMuc2l6ZSk7IH0pO1xyXG4gICAgICAgICAgICBrby5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnb2Zmc2V0JywgZnVuY3Rpb24gKCkgeyByZXR1cm4gKF90aGlzLnBhZ2UgLSAxKSAqIF90aGlzLnNpemU7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQYWdlci5wcm90b3R5cGUuZ29UbyA9IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdlIDwgMSlcclxuICAgICAgICAgICAgICAgIHBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBpZiAocGFnZSA+IHRoaXMucGFnZXMpXHJcbiAgICAgICAgICAgICAgICBwYWdlID0gdGhpcy5wYWdlcztcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlSW5wdXQgPSBwYWdlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUGFnZXIucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdvVG8oMSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYWdlci5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nb1RvKHRoaXMucGFnZSAtIDEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUGFnZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ubyh0aGlzLnBhZ2UgKyAxKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFBhZ2VyLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdvVG8odGhpcy5wYWdlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYWdlci5wcm90b3R5cGUuaW5wdXR0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ubyh0aGlzLnBhZ2VJbnB1dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUGFnZXI7XHJcbiAgICB9KShDb21wb25lbnQpO1xyXG4gICAgcmVxdWlyZSgnLi9QYWdlci5sZXNzJyk7XHJcbiAgICBDb21wb25lbnQucmVnaXN0ZXIoJ3BhZ2VyJywgUGFnZXIsIHJlcXVpcmUoJy4vUGFnZXIuaHRtbCcpKTtcclxuICAgIHJldHVybiBQYWdlcjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBhZ2VyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9wYWdlci9QYWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcdFxcdDxoMSBjbGFzcz1cXFwicGFnZS1oZWFkZXJcXFwiPkNvbnRhY3RzPC9oMT5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nIGNsZWFyZml4XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8cGFnZXIgcGFyYW1zPVxcXCJvcHRpb246IHBhZ2VyXFxcIj48L3BhZ2VyPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcblxcdFxcdFxcdFxcdDx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aGVhZD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHRoPuaXpeaZgjwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHRoPuOBiuWQjeWJjTwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHRoPuOCv+OCpOODiOODqzwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC90cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L3RoZWFkPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IG1lc3NhZ2VzXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dHIgc3R5bGU9XFxcImN1cnNvcjogcG9pbnRlcjtcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQuc2hvd1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHRkPnt7IGRhdGUgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDx0ZD57eyBuYW1lIH19PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8dGQ+e3sgdGl0bGUgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC90Ym9keT5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RhYmxlPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcclxcbjxzY3JpcHQgdHlwZT1cXFwidGV4dC9odG1sXFxcIiBpZD1cXFwibWVzc2FnZU1vZGFsQm9keVxcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcdFxcdFxcdDx0YWJsZSBjbGFzcz1cXFwidGFibGVcXFwiPlxcclxcblxcdFxcdFxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGggc3R5bGU9XFxcIndpZHRoOiA4MHB4O1xcXCI+5pel5pmCPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGQ+e3sgZGF0ZSB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0PC90cj5cXHJcXG5cXHRcXHRcXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRoPuOBiuWQjeWJjTwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRkPnt7IG5hbWUgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0XFx0XFx0PHRyPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aD7jgr/jgqTjg4jjg6s8L3RoPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD57eyB0aXRsZSB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0PC90cj5cXHJcXG5cXHRcXHRcXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRoPuacrOaWhzwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRkIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxcIj57eyBib2R5IH19PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdDwvdGFibGU+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9zY3JpcHQ+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvY29udGFjdC9Db250YWN0UGFnZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxccGFnZXJcXFxcUGFnZXIubGVzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcc3R5bGUtbG9hZGVyXFxcXGFkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxccGFnZXJcXFxcUGFnZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcbGVzcy1sb2FkZXJcXFxcaW5kZXguanMhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxwYXJ0c1xcXFxwYWdlclxcXFxQYWdlci5sZXNzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9wYWdlci9QYWdlci5sZXNzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGNzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJ1bC5rby1wYWdlciB7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBtYXJnaW4tYm90dG9tOiA0cHg7XFxufVxcbnVsLmtvLXBhZ2VyID4gbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG51bC5rby1wYWdlciA+IGxpLnBhZ2VyLWlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIG1hcmdpbjogNHB4IDA7XFxuICBjb2xvcjogIzc3NztcXG4gIGJvcmRlcjogc29saWQgMXB4ICNhYWE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAgMnB4O1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbnVsLmtvLXBhZ2VyID4gbGkucGFnZXItaW5wdXQgaW5wdXQge1xcbiAgd2lkdGg6IDM1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMCAycHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbnVsLmtvLXBhZ2VyID4gbGkucGFnZXItc3VtbWFyeSB7XFxuICBjb2xvcjogIzg4ODtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxudWwua28tcGFnZXIgPiBsaS5idG4ge1xcbiAgbWFyZ2luLXRvcDogLTJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiAjNDI4YmNhO1xcbn1cXG51bC5rby1wYWdlciA+IGxpLmJ0biA+IGkge1xcbiAgbWFyZ2luOiAwIDFweDtcXG59XFxudWwua28tcGFnZXIgPiBsaS5idG46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG59XFxuXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3BhcnRzL3BhZ2VyL1BhZ2VyLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1bCBjbGFzcz1cXFwia28tcGFnZXJcXFwiPlxcclxcblxcdDxsaSBjbGFzcz1cXFwicGFnZXItc3VtbWFyeVxcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiAhbG9hZGluZ1xcXCI+XFxyXFxuXFx0XFx0PHNwYW4gY2xhc3M9XFxcImhpZGRlbi14c1xcXCI+XFxyXFxuXFx0XFx0XFx0PCEtLWtvIGlmOiBjb3VudCA+IDAgLS0+XFxyXFxuXFx0XFx0XFx0PHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBjb3VudFxcXCI+IDwvc3Bhbj4g5Lu25LitXFxyXFxuXFx0XFx0XFx0PHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBvZmZzZXQgKyAxXFxcIj4gPC9zcGFuPiAtXFxyXFxuXFx0XFx0XFx0PHNwYW4gZGF0YS1iaW5kPVxcXCJ0ZXh0OiBvZmZzZXQgKyBpdGVtcy5sZW5ndGhcXFwiPiA8L3NwYW4+IOS7tuebruOCkuihqOekuuS4rVxcclxcblxcdFxcdFxcdDwhLS0va28tLT5cXHJcXG5cXHRcXHRcXHQ8IS0ta28gZWxzZS0tPlxcclxcblxcdFxcdFxcdOOCouOCpOODhuODoOOBjOeZu+mMsuOBleOCjOOBpuOBhOOBvuOBm+OCk1xcclxcblxcdFxcdFxcdDwhLS0va28tLT5cXHJcXG5cXHRcXHQ8L3NwYW4+XFxyXFxuXFx0PC9saT5cXHJcXG5cXHQ8bGkgY2xhc3M9XFxcImluZGljYXRvclxcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiBsb2FkaW5nXFxcIj5cXHJcXG5cXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXFxcIj48L2k+XFxyXFxuXFx0PC9saT5cXHJcXG5cXHQ8bGkgY2xhc3M9XFxcImJ0biBidG4teHNcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IGZpcnN0XFxcIj5cXHJcXG5cXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtc3RlcC1iYWNrd2FyZFxcXCI+PC9pPlxcclxcblxcdDwvbGk+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJidG4gYnRuLXhzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBwcmV2XFxcIj5cXHJcXG5cXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtY2FyZXQtbGVmdFxcXCI+PC9pPlxcclxcblxcdDwvbGk+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJwYWdlci1pbnB1dFxcXCIgb25jbGljaz1cXFwiJCh0aGlzKS5maW5kKCdpbnB1dCcpLmZvY3VzKCk7XFxcIj5cXHJcXG5cXHRcXHQ8Zm9ybSBkYXRhLWJpbmQ9XFxcInN1Ym1pdDogZ29Ub0lucHV0dGVkXFxcIj5cXHJcXG5cXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgb25mb2N1cz1cXFwidGhpcy5zZWxlY3QoKTtcXFwiXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0IGRhdGEtYmluZD1cXFwidmFsdWU6IHBhZ2VJbnB1dCxcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHR2YWx1ZVVwZGF0ZTogJ2FmdGVya2V5ZG93bidcXFwiIC8+XFxyXFxuXFx0XFx0XFx0LzxzcGFuIGRhdGEtYmluZD1cXFwidGV4dDogcGFnZXNcXFwiPiA8L3NwYW4+XFxyXFxuXFx0XFx0PC9mb3JtPlxcclxcblxcdDwvbGk+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJidG4gYnRuLXhzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBuZXh0XFxcIj5cXHJcXG5cXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtY2FyZXQtcmlnaHRcXFwiPjwvaT5cXHJcXG5cXHQ8L2xpPlxcclxcblxcdDxsaSBjbGFzcz1cXFwiYnRuIGJ0bi14c1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogbGFzdFxcXCI+XFxyXFxuXFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXN0ZXAtZm9yd2FyZFxcXCI+PC9pPlxcclxcblxcdDwvbGk+XFxyXFxuPC91bD5cXHJcXG5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvcGFnZXIvUGFnZXIuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vLi4vQ29tcG9uZW50J10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBDb21wb25lbnQpIHtcclxuICAgIHZhciBNb2RhbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKE1vZGFsLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIE1vZGFsKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmZvb3RlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3duID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd24uc3Vic2NyaWJlKGZ1bmN0aW9uIChzaG93bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog44Oi44O844OA44Or44OA44Kk44Ki44Ot44Kw44Gu5qiq5bmF44K144Kk44K644KS5aSJ5pu0XHJcbiAgICAgICAgICogQHBhcmFtIHNpemUgJ2xhcmdlJyDjgb7jgZ/jga8gJ3NtYWxsJ1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtNb2RhbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHRlbXBsYXRlIOODhuODs+ODl+ODrOODvOODiElEXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEg44OQ44Kk44Oz44OJ44GZ44KL44OH44O844K/44Kz44Oz44OG44Kt44K544OI44G+44Gf44GvIFZpZXdNb2RlbFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtNb2RhbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0Q3VzdG9tSGVhZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0geyBuYW1lOiB0ZW1wbGF0ZSwgZGF0YTogZGF0YSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSDjg4bjg7Pjg5fjg6zjg7zjg4hJRFxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIOODkOOCpOODs+ODieOBmeOCi+ODh+ODvOOCv+OCs+ODs+ODhuOCreOCueODiOOBvuOBn+OBryBWaWV3TW9kZWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7TW9kYWx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTW9kYWwucHJvdG90eXBlLnNldEN1c3RvbUJvZHkgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5ID0geyBuYW1lOiB0ZW1wbGF0ZSwgZGF0YTogZGF0YSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSDjg4bjg7Pjg5fjg6zjg7zjg4hJRFxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIOODkOOCpOODs+ODieOBmeOCi+ODh+ODvOOCv+OCs+ODs+ODhuOCreOCueODiOOBvuOBn+OBryBWaWV3TW9kZWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7TW9kYWx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTW9kYWwucHJvdG90eXBlLnNldEN1c3RvbUZvb3RlciA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvb3RlciA9IHsgbmFtZTogdGVtcGxhdGUsIGRhdGE6IGRhdGEgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0SGVhZGVyID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEN1c3RvbUhlYWRlcignbW9kYWxIZWFkZXInLCB7IGxhYmVsOiBsYWJlbCB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5zZXRCb2R5ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q3VzdG9tQm9keSgnbW9kYWxCb2R5JywgeyBjb250ZW50OiBjb250ZW50IH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9kYWwucHJvdG90eXBlLnNldEZvb3RlciA9IGZ1bmN0aW9uIChhY3Rpb24sIHByaW1hcnlMYWJlbCwgY2xvc2VMYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeUxhYmVsOiBwcmltYXJ5TGFiZWwsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUxhYmVsOiBjbG9zZUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3I6IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRDdXN0b21Gb290ZXIoJ21vZGFsRm9vdGVyJywgZGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XHJcbiAgICAgICAgICAgIGlmIChhcmcxICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVyKGFyZzEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCb2R5KGFyZzIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmczID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZvb3RlcihhcmczLCBhcmc0IHx8ICdPSycsIGFyZzUgfHwgJ0NhbmNlbCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGb290ZXIobnVsbCwgJycsIGFyZzMgfHwgJ09LJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd24oZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBNb2RhbDtcclxuICAgIH0pKENvbXBvbmVudCk7XHJcbiAgICBDb21wb25lbnQucmVnaXN0ZXIoJ21vZGFsJywgTW9kYWwsIHJlcXVpcmUoJy4vTW9kYWwuaHRtbCcpKTtcclxuICAgIHJldHVybiBNb2RhbDtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1vZGFsLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9tb2RhbC9Nb2RhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwibW9kYWxcXFwiIGNsYXNzPVxcXCJtb2RhbCBmYWRlXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIHJvbGU9XFxcImRpYWxvZ1xcXCJcXHJcXG5cXHRcXHQgZGF0YS1iaW5kPVxcXCJtb2RhbFNob3duOiBzaG93blxcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtZGlhbG9nXFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IG1vZGFsLWxnOiBzaXplID09ICdsYXJnZScsIG1vZGFsLXNtOiBzaXplID09ICdzbWFsbCcgfVxcXCI+XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtY29udGVudFxcXCI+XFxyXFxuXFx0XFx0XFx0e3sjaWYgaGVhZGVyIH19XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRlbXBsYXRlOiBoZWFkZXJcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHRcXHR7eyNpZiBib2R5IH19XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtYm9keVxcXCIgZGF0YS1iaW5kPVxcXCJ0ZW1wbGF0ZTogYm9keVxcXCI+PC9kaXY+XFxyXFxuXFx0XFx0XFx0e3svaWZ9fVxcclxcblxcdFxcdFxcdHt7I2lmIGZvb3RlciAmJiAhYWN0aW9uU3VzcGVuZGVkIH19XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRlbXBsYXRlOiBmb290ZXJcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHRcXHR7eyNpZiBhY3Rpb25TdXNwZW5kZWQgfX1cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJtb2RhbC1mb290ZXJcXFwiIGRhdGEtYmluZD1cXFwidGVtcGxhdGU6eyBuYW1lOiAnc3VzcGVuZGVkTW9kYWxGb290ZXInIH1cXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48c2NyaXB0IHR5cGU9XFxcInRleHQvaHRtbFxcXCIgaWQ9XFxcIm1vZGFsSGVhZGVyXFxcIj5cXHJcXG5cXHQ8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcIm1vZGFsXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+w5c8L2J1dHRvbj5cXHJcXG5cXHQ8aDMgZGF0YS1iaW5kPVxcXCJ0ZXh0OiBsYWJlbFxcXCI+PC9oMz5cXHJcXG48L3NjcmlwdD5cXHJcXG48c2NyaXB0IHR5cGU9XFxcInRleHQvaHRtbFxcXCIgaWQ9XFxcIm1vZGFsQm9keVxcXCI+XFxyXFxuXFx0PGRpdiBkYXRhLWJpbmQ9XFxcImh0bWw6IGNvbnRlbnRcXFwiPjwvZGl2Plxcclxcbjwvc2NyaXB0PlxcclxcbjxzY3JpcHQgdHlwZT1cXFwidGV4dC9odG1sXFxcIiBpZD1cXFwibW9kYWxGb290ZXJcXFwiPlxcclxcblxcdDxzcGFuIGNsYXNzPVxcXCJ0ZXh0LWRhbmdlclxcXCIgZGF0YS1iaW5kPVxcXCJ2aXNpYmxlOiBoYXNFcnJvclxcXCI+44Ko44Op44O844GM44GC44KK44G+44GZ44CC6KiC5q2j44GX44Gm44GP44Gg44GV44GE44CCPC9zcGFuPlxcclxcblxcdHt7I2lmICRkYXRhLmFjdGlvbiB9fVxcclxcblxcdDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IGFjdGlvbiwgaHRtbDogcHJpbWFyeUxhYmVsXFxcIj48L2E+XFxyXFxuXFx0e3svaWZ9fVxcclxcblxcdDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZD1cXFwiaHRtbDogY2xvc2VMYWJlbFxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCI+PC9hPlxcclxcbjwvc2NyaXB0PlxcclxcbjxzY3JpcHQgdHlwZT1cXFwidGV4dC9odG1sXFxcIiBpZD1cXFwic3VzcGVuZGVkTW9kYWxGb290ZXJcXFwiPlxcclxcblxcdDxpIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cXFwiPjwvaT5cXHJcXG48L3NjcmlwdD5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvbW9kYWwvTW9kYWwuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIuLi9wdWJsaWMvanMvYnVuZGxlLmpzIn0=