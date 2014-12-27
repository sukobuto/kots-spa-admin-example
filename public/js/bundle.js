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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, DependencyInjector, Injectable, Shell, AdminApi, Toaster, ResourceContainer, Modal) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3), __webpack_require__(10), __webpack_require__(11), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Injectable, SideNav, HeaderNav, MenuItem) {
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
	                    page: __webpack_require__(16).factory,
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ApiBase) {
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
/* 7 */
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
	    Component.register('modal', Modal, __webpack_require__(17));
	    return Modal;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Modal.js.map

/***/ },
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
/* 10 */
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
	    __webpack_require__(28);
	    Component.register('side-nav', SideNav, __webpack_require__(18));
	    return SideNav;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=SideNav.js.map

/***/ },
/* 11 */
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
	    Component.register('header-nav', HeaderNav, __webpack_require__(19));
	    return HeaderNav;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=HeaderNav.js.map

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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(20)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page) {
	    var componentId = 'home-page';
	    var HomePage = (function (_super) {
	        __extends(HomePage, _super);
	        function HomePage() {
	            _super.call(this);
	            this.title = "KO + TypeScript で大規模 SPA 開発";
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
	    __webpack_require__(30);
	    Page.register(componentId, HomePage, __webpack_require__(21));
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(20), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, PartialViewModel) {
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
	    Page.register(componentId, SettingsPage, __webpack_require__(26));
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(20), __webpack_require__(22), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, PartialViewModel, Validation) {
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
	    Page.register(componentId, UserPage, __webpack_require__(27));
	    return UserPage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=UserPage.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(20), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Page, Pager) {
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
	    Page.register(componentId, ContactPage, __webpack_require__(25));
	    return ContactPage;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=ContactPage.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"\r\n\t\t data-bind=\"modalShown: shown\">\r\n\t<div class=\"modal-dialog\" data-bind=\"css:{ modal-lg: size == 'large', modal-sm: size == 'small' }\">\r\n\t\t<div class=\"modal-content\">\r\n\t\t\t{{#if header }}\r\n\t\t\t<div class=\"modal-header\" data-bind=\"template: header\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if body }}\r\n\t\t\t<div class=\"modal-body\" data-bind=\"template: body\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if footer && !actionSuspended }}\r\n\t\t\t<div class=\"modal-footer\" data-bind=\"template: footer\"></div>\r\n\t\t\t{{/if}}\r\n\t\t\t{{#if actionSuspended }}\r\n\t\t\t<div class=\"modal-footer\" data-bind=\"template:{ name: 'suspendedModalFooter' }\"></div>\r\n\t\t\t{{/if}}\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<script type=\"text/html\" id=\"modalHeader\">\r\n\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\r\n\t<h3 data-bind=\"text: label\"></h3>\r\n</script>\r\n<script type=\"text/html\" id=\"modalBody\">\r\n\t<div data-bind=\"html: content\"></div>\r\n</script>\r\n<script type=\"text/html\" id=\"modalFooter\">\r\n\t<span class=\"text-danger\" data-bind=\"visible: hasError\">エラーがあります。訂正してください。</span>\r\n\t{{#if $data.action }}\r\n\t<a href=\"#\" class=\"btn btn-primary\" data-bind=\"click: action, html: primaryLabel\"></a>\r\n\t{{/if}}\r\n\t<a href=\"#\" class=\"btn btn-default\" data-bind=\"html: closeLabel\" data-dismiss=\"modal\"></a>\r\n</script>\r\n<script type=\"text/html\" id=\"suspendedModalFooter\">\r\n\t<i class=\"fa fa-spinner fa-spin\"></i>\r\n</script>";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"navbar-default sidebar\" role=\"navigation\">\r\n\t<div class=\"sidebar-nav navbar-collapse\">\r\n\t\t<ul class=\"nav\" id=\"side-menu\">\r\n\t\t\t{{#foreach menu}}\r\n\t\t\t<li>\r\n\t\t\t\t<a href=\"#{{path}}\" data-bind=\"css:{ active: $parents[1].menuId == name }\">\r\n\t\t\t\t\t<i class=\"fa fa-fw fa-{{icon}}\"></i> {{label}}\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t{{/foreach}}\r\n\t\t</ul>\r\n\t</div>\r\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"navbar-header\">\r\n\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n\t\t<span class=\"sr-only\">Toggle navigation</span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t\t<span class=\"icon-bar\"></span>\r\n\t</button>\r\n\t<a class=\"navbar-brand\" href=\"./\">{{ resources.config.label.app_title }}</a>\r\n</div><!-- /.navbar-header -->\r\n\r\n<ul class=\"nav navbar-top-links navbar-right\">\r\n\t<li class=\"dropdown\">\r\n\t\t<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\r\n\t\t\t<i class=\"fa fa-user fa-fw\"></i> {{ resources.user.name }} <i class=\"fa fa-caret-down\"></i>\r\n\t\t</a>\r\n\t\t<ul class=\"dropdown-menu dropdown-user\">\r\n\t\t\t<li><a href=\"#settings\"><i class=\"fa fa-gear fa-fw\"></i> アカウント設定</a></li>\r\n\t\t\t{{#if resources.user.is_master}}\r\n\t\t\t<li><a href=\"#user\"><i class=\"fa fa-users fa-fw\"></i> ユーザ管理</a></li>\r\n\t\t\t{{/if}}\r\n\t\t\t<li class=\"divider\"></li>\r\n\t\t\t<li><a href=\"#\"><i class=\"fa fa-sign-out fa-fw\"></i> ログアウト</a></li>\r\n\t\t</ul><!-- /.dropdown-user -->\r\n\t</li><!-- /.dropdown -->\r\n</ul><!-- /.navbar-top-links -->";

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">{{title}}</h1>\r\n\t\t<ul>\r\n\t\t\t<li>\r\n\t\t\t\t<a href=\"http://qiita.com/sukobuto/items/392d35c1a7170c143278\">紹介記事はこちら</a>\r\n\t\t\t</li>\r\n\t\t\t<li>\r\n\t\t\t\t<a href=\"https://github.com/sukobuto/kots-spa-admin-example\">Github</a>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</div>";

/***/ },
/* 22 */
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
/* 23 */
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
/* 24 */
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
	    __webpack_require__(34);
	    Component.register('pager', Pager, __webpack_require__(36));
	    return Pager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	//# sourceMappingURL=Pager.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">Contacts</h1>\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\t<pager params=\"option: pager\"></pager>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<table class=\"table table-hover\">\r\n\t\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th>日時</th>\r\n\t\t\t\t\t\t<th>お名前</th>\r\n\t\t\t\t\t\t<th>タイトル</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody data-bind=\"foreach: messages\">\r\n\t\t\t\t\t<tr style=\"cursor: pointer;\" data-bind=\"click: $parent.show\">\r\n\t\t\t\t\t\t<td>{{ date }}</td>\r\n\t\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t\t\t<td>{{ title }}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n<script type=\"text/html\" id=\"messageModalBody\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<table class=\"table\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th style=\"width: 80px;\">日時</th>\r\n\t\t\t\t\t<td>{{ date }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>お名前</th>\r\n\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>タイトル</th>\r\n\t\t\t\t\t<td>{{ title }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>本文</th>\r\n\t\t\t\t\t<td style=\"white-space: pre-wrap;\">{{ body }}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</script>";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t<h1 class=\"page-header\">アカウント設定</h1>\r\n\t</div>\r\n</div>\r\n<div class=\"row\">\r\n\r\n\t<div class=\"col-lg-6\">\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\tユーザ設定\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\" data-bind=\"with: profileEditor\">\r\n\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-lg-12\">\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<p>ユーザID: {{ resources.user.login }}</p>\r\n\t\t\t\t\t\t\t<p>\r\n\t\t\t\t\t\t\t\tクリアランス: \r\n\t\t\t\t\t\t\t{{#if resources.user.is_master}}\r\n\t\t\t\t\t\t\t<span class=\"label label-info\">master</span>\r\n\t\t\t\t\t\t\t{{/if}}\r\n\t\t\t\t\t\t\t{{#else}}\r\n\t\t\t\t\t\t\t{{#foreach: resources.user.clearances}}\r\n\t\t\t\t\t\t\t\t<span class=\"label label-success\">{{ $data }}</span>\r\n\t\t\t\t\t\t\t{{/foreach}}\r\n\t\t\t\t\t\t\t{{/else}}\r\n\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"name\">ユーザ名</label>\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"name\" data-bind=\"value: profile.name\"/>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label for=\"email\">メールアドレス</label>\r\n\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" id=\"email\" data-bind=\"value: profile.email\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<button class=\"btn btn-primary btn-block\" data-bind=\"click: save, disable: saving\">\r\n\t\t\t\t\t\t\t変更{{#if saving}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"col-lg-6\">\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-heading clearfix\">\r\n\t\t\t\tパスワード変更\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body\" data-bind=\"with: passwordChanger\">\r\n\t\t\t\t\r\n\t\t\t\t<p>\r\n\t\t\t\t\tパスワードは半角8字以上で、小文字, 大文字, 数字, 記号のうちいずれか2種類以上の文字を使う必要があります。\r\n\t\t\t\t</p>\r\n\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-lg-12\">\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>現在のパスワード</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: password\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>新しいパスワード</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: new_password\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<label>新しいパスワード（確認のためもう一度入力してください）</label>\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" data-bind=\"value: password_confirm\"/>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<button class=\"btn btn-primary btn-block\" data-bind=\"click: change, disable: saving\">\r\n\t\t\t\t\t\t\t変更{{#if saving}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n\t\t\t\t\t\t</button>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\r\n</div>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"row\">\r\n\t<div class=\"col-lg-12\">\r\n\t\t\r\n\t\t<h1 class=\"page-header\">ユーザ管理</h1>\r\n\r\n\t\t<div class=\"panel panel-default\">\r\n            <div class=\"panel-heading clearfix\">\r\n                <div class=\"pull-right\">\r\n                    {{#if loading}} <i class=\"fa fa-spinner fa-spin\"></i> {{/if}}\r\n                    <button class=\"btn btn-primary\" data-bind=\"click: add\">\r\n                        <i class=\"fa fa-user\"></i> ユーザ追加\r\n                    </button>\r\n                </div>\r\n            </div>\r\n\t\t\t<table class=\"table table-hover\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>ID</th>\r\n\t\t\t\t\t<th>名前</th>\r\n\t\t\t\t\t<th>状態</th>\r\n\t\t\t\t\t<th>管理</th>\r\n\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody data-bind=\"foreach: users\">\r\n\t\t\t\t<tr data-bind=\"click: $parent.edit\" style=\"cursor: pointer;\">\r\n\t\t\t\t\t<td>{{ login }}</td>\r\n\t\t\t\t\t<td>{{ name }}</td>\r\n\t\t\t\t\t<td>\r\n                        <span class=\"label label-info\" data-bind=\"visible: is_master\">master</span>\r\n                        <span class=\"label label-success\" data-bind=\"visible: enabled\">有効</span>\r\n                        <span class=\"label label-default\" data-bind=\"visible: !enabled\">停止中</span>\r\n                    </td>\r\n\t\t\t\t\t<td>\r\n                        {{#if id !== $parent.resources.user.id}}\r\n                        <div class=\"btn-group btn-group-xs\">\r\n                            <button class=\"btn btn-default\" data-bind=\"click: $parent.toggleEnabled, clickBubble: false\">\r\n                                {{#if enabled}} <i class=\"fa fa-ban\"></i> 停止 {{/if}}\r\n                                {{#else}} <i class=\"fa fa-recycle\"></i> 有効化 {{/else}}\r\n                            </button>\r\n                            <button class=\"btn btn-default\" data-bind=\"click: $parent.remove, clickBubble: false\">\r\n                                <i class=\"fa fa-trash\"></i> 削除\r\n                            </button>\r\n                        </div>\r\n                        {{/if}}\r\n                        {{#else}}\r\n                        ログイン中\r\n                        {{/else}}\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</div>\r\n\t\t\t\t\r\n<!-- ユーザ追加ダイアログテンプレート -->\r\n<script type=\"text/html\" id=\"userEditorModalBody\">\r\n\t<div class=\"row\">\r\n\r\n\t\t{{#if edit}}\r\n\t\t\t<div class=\"well well-sm\">パスワードを変更しない場合はパスワード欄を空にしてください。</div>\r\n\t\t{{/if}}\r\n\t\t\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('login') }\">\r\n\t\t\t\t<label for=\"login\" data-bind=\"css:{ necessary-field: !edit }\">\r\n\t\t\t\t\tユーザID <small>半角英数,アンダースコア(_)</small>\r\n\t\t\t\t</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"login\" placeholder=\"user_id\" \r\n\t\t\t\t\t\t\t value=\"{{ user.login }}\" data-bind=\"disable: edit\" />\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('login') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('name') }\">\r\n\t\t\t\t<label for=\"name\" class=\"necessary-field\">名前</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"text\" id=\"name\" value=\"{{ user.name }}\"\r\n\t\t\t\t\t\t\t placeholder=\"{{ resources.config.label.provider }}\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('name') }}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div class=\"col-md-6\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css: { has-error: validation.hasError('password') }\">\r\n\t\t\t\t<label for=\"password\" data-bind=\"css:{ necessary-field: !edit }\">\r\n\t\t\t\t\tパスワード <small>半角英数,記号 8字以上</small>\r\n\t\t\t\t</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"password\" id=\"password\"\r\n\t\t\t\t\t\t\t value=\"{{ user.password }}\" placeholder=\"●●●●●●●●\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('password') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" data-bind=\"css: { has-error: validation.hasError('password_confirm') }\">\r\n\t\t\t\t<label for=\"password_confirm\" data-bind=\"css:{ necessary-field: !edit }\">パスワード（確認）</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"password\" id=\"password_confirm\"\r\n\t\t\t\t\t\t\t value=\"{{ password_confirm }}\" placeholder=\"●●●●●●●●\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('password_confirm') }}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<div class=\"form-group\" data-bind=\"css:{ has-error: validation.hasError('email') }\">\r\n\t\t\t\t<label for=\"email\">メールアドレス</label>\r\n\t\t\t\t<input class=\"form-control\" type=\"email\" id=\"email\" data-bind=\"value: user.email\"/>\r\n\t\t\t\t<span class=\"help-block text-danger\">{{ validation.getError('email') }}</span>\r\n\t\t\t</div>\r\n\t\t\t<h4>使用を許可する機能</h4>\r\n\t\t\t<div class=\"form-group btn-group btn-group-sm\" data-bind=\"foreach: clearance_options\">\r\n\t\t\t\t<label class=\"btn\" data-bind=\"css:{\r\n\t\t\t\t\t\t'btn-default': !$parent.hasClearanceOf(key),\r\n\t\t\t\t\t\t'btn-primary active': $parent.hasClearanceOf(key)\r\n\t\t\t\t\t}\">\r\n\t\t\t\t\t<input type=\"checkbox\" style=\"display: none;\" value=\"{{ key }}\" data-bind=\"checked: $parent.user.clearances\"/>{{ name }}\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</script>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(32)(content, {});
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	exports.push([module.id, "", ""]);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(32)(content, {});
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	exports.push([module.id, "", ""]);

/***/ },
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(32)(content, {});
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	exports.push([module.id, "ul.ko-pager {\n  float: right;\n  height: 24px;\n  margin-bottom: 4px;\n}\nul.ko-pager > li {\n  display: inline-block;\n  font-size: 14px;\n}\nul.ko-pager > li.pager-input {\n  font-size: 13px;\n  margin: 4px 0;\n  color: #777;\n  border: solid 1px #aaa;\n  background-color: white;\n  padding: 0 2px;\n  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);\n  border-radius: 3px;\n}\nul.ko-pager > li.pager-input input {\n  width: 35px;\n  text-align: right;\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0 2px;\n  vertical-align: baseline;\n}\nul.ko-pager > li.pager-summary {\n  color: #888;\n  margin-right: 10px;\n}\nul.ko-pager > li.btn {\n  margin-top: -2px;\n  cursor: pointer;\n  color: #428bca;\n}\nul.ko-pager > li.btn > i {\n  margin: 0 1px;\n}\nul.ko-pager > li.btn:hover {\n  background-color: #ddd;\n}\n", ""]);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ul class=\"ko-pager\">\r\n\t<li class=\"pager-summary\" data-bind=\"visible: !loading\">\r\n\t\t<span class=\"hidden-xs\">\r\n\t\t\t<!--ko if: count > 0 -->\r\n\t\t\t<span data-bind=\"text: count\"> </span> 件中\r\n\t\t\t<span data-bind=\"text: offset + 1\"> </span> -\r\n\t\t\t<span data-bind=\"text: offset + items.length\"> </span> 件目を表示中\r\n\t\t\t<!--/ko-->\r\n\t\t\t<!--ko else-->\r\n\t\t\tアイテムが登録されていません\r\n\t\t\t<!--/ko-->\r\n\t\t</span>\r\n\t</li>\r\n\t<li class=\"indicator\" data-bind=\"visible: loading\">\r\n\t\t<i class=\"fa fa-refresh fa-spin\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: first\">\r\n\t\t<i class=\"fa fa-step-backward\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: prev\">\r\n\t\t<i class=\"fa fa-caret-left\"></i>\r\n\t</li>\r\n\t<li class=\"pager-input\" onclick=\"$(this).find('input').focus();\">\r\n\t\t<form data-bind=\"submit: goToInputted\">\r\n\t\t\t<input type=\"text\" onfocus=\"this.select();\"\r\n\t\t\t\t\t\t data-bind=\"value: pageInput,\r\n\t\t\t\t\t\t\t\t\t\t\t\tvalueUpdate: 'afterkeydown'\" />\r\n\t\t\t/<span data-bind=\"text: pages\"> </span>\r\n\t\t</form>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: next\">\r\n\t\t<i class=\"fa fa-caret-right\"></i>\r\n\t</li>\r\n\t<li class=\"btn btn-xs\" data-bind=\"click: last\">\r\n\t\t<i class=\"fa fa-step-forward\"></i>\r\n\t</li>\r\n</ul>\r\n";

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDY3MWQ4NTFiMTk1NGMyZGYwZmQiLCJ3ZWJwYWNrOi8vLy4vQXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vU2hlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZGkvRGVwZW5kZW5jeUluamVjdG9yLmpzIiwid2VicGFjazovLy8uL2RpL0RlcGVuZGVuY3lJbmplY3RhYmxlLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL0FkbWluQXBpLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL1RvYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvUmVzb3VyY2VDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvbW9kYWwvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvTWVudUl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvQXBpQmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9zaWRlLW5hdi9TaWRlTmF2LmpzIiwid2VicGFjazovLy8uL3BhcnRzL2hlYWRlci1uYXYvSGVhZGVyTmF2LmpzIiwid2VicGFjazovLy8uL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2hvbWUvSG9tZVBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZS91c2VyL1VzZXJQYWdlLmpzIiwid2VicGFjazovLy8uL3BhZ2UvY29udGFjdC9Db250YWN0UGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9tb2RhbC9Nb2RhbC5odG1sIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYuaHRtbCIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9oZWFkZXItbmF2L0hlYWRlck5hdi5odG1sIiwid2VicGFjazovLy8uL3BhZ2UvUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2hvbWUvSG9tZVBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vLi9wYWdlL1BhcnRpYWxWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvVmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wYXJ0cy9wYWdlci9QYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2NvbnRhY3QvQ29udGFjdFBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vLi9wYWdlL3NldHRpbmdzL1NldHRpbmdzUGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhZ2UvdXNlci9Vc2VyUGFnZS5odG1sIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYubGVzcz81ZWYyIiwid2VicGFjazovLy8uL3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYubGVzcyIsIndlYnBhY2s6Ly8vLi9wYWdlL2hvbWUvSG9tZVBhZ2UubGVzcz85MmFmIiwid2VicGFjazovLy8uL3BhZ2UvaG9tZS9Ib21lUGFnZS5sZXNzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvcGFnZXIvUGFnZXIubGVzcz84YzYxIiwid2VicGFjazovLy8uL3BhcnRzL3BhZ2VyL1BhZ2VyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vcGFydHMvcGFnZXIvUGFnZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyx1QkFBdUIsRUFBRTtBQUNoRSw0Q0FBMkMsc0JBQXNCLEVBQUU7QUFDbkUsMENBQXlDLG9CQUFvQixFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCx5QkFBd0I7QUFDeEIsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQSw2QkFBNEI7QUFDNUI7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCx3Qzs7Ozs7O0FDNUNBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRSxlQUFlLEVBQUUsZ0JBQWdCLFVBQVUsRUFBRTtBQUN4SCxvRkFBbUYsMERBQTBELEVBQUUsdUJBQXVCLDhEQUE4RCxFQUFFO0FBQ3RPLGdFQUErRCwwREFBMEQsRUFBRSx5QkFBeUIsZUFBZSxFQUFFLGdCQUFnQixrQkFBa0IsRUFBRTtBQUN6TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdDQUFnQztBQUMxRDtBQUNBLDJDQUEwQyxnQ0FBZ0MsRUFBRTtBQUM1RSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsb0NBQW9DLEVBQUU7QUFDaEYsa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLGdDQUFnQyxFQUFFO0FBQzVFLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMEIscUNBQXFDO0FBQy9EO0FBQ0EsMkNBQTBDLG1DQUFtQyxFQUFFO0FBQy9FLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Qsa0M7Ozs7OztpRUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0QsK0M7Ozs7OztpRUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQztBQUNELGlEOzs7Ozs7QUNqREE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxxQzs7Ozs7O2lFQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxvQzs7Ozs7O2lFQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCw4Qzs7Ozs7O0FDVkE7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EseURBQXdELGVBQWU7QUFDdkU7QUFDQTtBQUNBLHFEQUFvRCxtQkFBbUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsa0M7Ozs7OztpRUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0QscUM7Ozs7OztpRUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyw2Q0FBNkM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixzQkFBc0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Qsb0M7Ozs7OztBQzdEQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsb0M7Ozs7OztBQ3hCQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsc0M7Ozs7OztBQ2xCQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0Qsc0M7Ozs7OztBQzFCQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxxQzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCx5Qzs7Ozs7O0FDbkdBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsZ0NBQWdDO0FBQ2pELGtCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLGtCQUFrQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRCxxQzs7Ozs7O0FDOUtBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsd0M7Ozs7OztBQzdDQSxxTEFBb0wsdURBQXVELG9EQUFvRCxhQUFhLHVGQUF1RixLQUFLLFlBQVksV0FBVyxtRkFBbUYsS0FBSyxZQUFZLGlDQUFpQyx1RkFBdUYsS0FBSyxZQUFZLHNCQUFzQiw0REFBNEQsK0JBQStCLHFCQUFxQixLQUFLLCtlQUErZSxtQkFBbUIsMEdBQTBHLEtBQUssNE87Ozs7OztBQ0F4NEMscUxBQW9MLGVBQWUsdUNBQXVDLE1BQU0sb0JBQW9CLHFDQUFxQywwQ0FBMEMsTUFBTSxVQUFVLE9BQU8sMkNBQTJDLFVBQVUscUM7Ozs7OztBQ0EvWiw2WUFBNFksb0NBQW9DLG1QQUFtUCx1QkFBdUIsb01BQW9NLDhCQUE4Qiw4RkFBOEYsS0FBSywrTjs7Ozs7O0FDQS8vQjtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCxpQzs7Ozs7O0FDckNBLHlHQUF3RyxPQUFPLDhSOzs7Ozs7QUNBL0c7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDO0FBQ0QsNkM7Ozs7OztpRUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1R0FBc0csMEJBQTBCLEVBQUU7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLHVHQUFzRywwQkFBMEIsRUFBRTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QywrQkFBK0I7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRCx1Qzs7Ozs7O0FDeERBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTBELDRDQUE0QyxFQUFFO0FBQ3hHLDREQUEyRCxzQ0FBc0MsRUFBRTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Qsa0M7Ozs7OztBQ25EQSx5bUJBQXdtQiwyREFBMkQsUUFBUSwyQkFBMkIsUUFBUSwyQkFBMkIsU0FBUyxrVUFBa1UsOEJBQThCLFFBQVEsb0ZBQW9GLFFBQVEscUZBQXFGLFNBQVMsK0dBQStHLEtBQUssUUFBUSxpRjs7Ozs7O0FDQWg1QywwaEJBQXloQix3QkFBd0IseUVBQXlFLDhCQUE4QixvRkFBb0YsS0FBSyxvQkFBb0IsT0FBTyxvQkFBb0IscUNBQXFDLDBEQUEwRCxTQUFTLDJCQUEyQixVQUFVLG9CQUFvQixPQUFPLGtuQkFBa25CLFlBQVksMkNBQTJDLEtBQUssNHhDQUE0eEMsWUFBWSwyQ0FBMkMsS0FBSyxxSTs7Ozs7O0FDQTk4RixzU0FBcVMsYUFBYSwyQ0FBMkMsS0FBSyxxakJBQXFqQix1QkFBdUIsU0FBUyx5QkFBeUIsUUFBUSxpYUFBaWEsc0NBQXNDLHlPQUF5TyxhQUFhLGtDQUFrQyxLQUFLLHNDQUFzQyxPQUFPLHVDQUF1QyxPQUFPLGdWQUFnVixLQUFLLDhCQUE4QixPQUFPLCtEQUErRCxPQUFPLGdRQUFnUSxVQUFVLG9GQUFvRixLQUFLLDZGQUE2RiwwQ0FBMEMscURBQXFELHlCQUF5QixtTUFBbU0sY0FBYyxzRkFBc0YsZ0NBQWdDLDRFQUE0RSx5Q0FBeUMscUpBQXFKLGFBQWEscUNBQXFDLG1DQUFtQyx5REFBeUQsK0JBQStCLG1JQUFtSSw2Q0FBNkMsd0RBQXdELHlCQUF5Qiw4S0FBOEssaUJBQWlCLGtGQUFrRixtQ0FBbUMsNkVBQTZFLHFEQUFxRCxnRUFBZ0UseUJBQXlCLG9JQUFvSSxvQkFBb0Isa0ZBQWtGLDJDQUEyQyxnTEFBZ0wsMENBQTBDLCtNQUErTSxnQ0FBZ0MseU1BQXlNLDRJQUE0SSxnRUFBZ0UsYUFBYSxPQUFPLHFEQUFxRCxRQUFRLHFGOzs7Ozs7QUNBaitLOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQThJO0FBQzlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNqQkE7QUFDQSxtQzs7Ozs7O0FDREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBOEk7QUFDOUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ2pCQTtBQUNBLG1DOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBd0Q7QUFDeEQsNkNBQTRDO0FBQzVDLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUE4STtBQUM5STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDakJBO0FBQ0Esd0NBQXVDLGlCQUFpQixpQkFBaUIsdUJBQXVCLEdBQUcsb0JBQW9CLDBCQUEwQixvQkFBb0IsR0FBRyxnQ0FBZ0Msb0JBQW9CLGtCQUFrQixnQkFBZ0IsMkJBQTJCLDRCQUE0QixtQkFBbUIsaURBQWlELHVCQUF1QixHQUFHLHNDQUFzQyxnQkFBZ0Isc0JBQXNCLGtDQUFrQyxjQUFjLGNBQWMsbUJBQW1CLDZCQUE2QixHQUFHLGtDQUFrQyxnQkFBZ0IsdUJBQXVCLEdBQUcsd0JBQXdCLHFCQUFxQixvQkFBb0IsbUJBQW1CLEdBQUcsNEJBQTRCLGtCQUFrQixHQUFHLDhCQUE4QiwyQkFBMkIsR0FBRyxVOzs7Ozs7QUNEaDJCLHczQkFBdTNCLDJHQUEyRyx1YSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ2NzFkODUxYjE5NTRjMmRmMGZkXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2RpL0RlcGVuZGVuY3lJbmplY3RvcicsICdkaS9EZXBlbmRlbmN5SW5qZWN0YWJsZScsICcuL1NoZWxsJywgJ3NlcnZpY2VzL0FkbWluQXBpJywgJ3NlcnZpY2VzL1RvYXN0ZXInLCAnc2VydmljZXMvUmVzb3VyY2VDb250YWluZXInLCAncGFydHMvbW9kYWwvTW9kYWwnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIERlcGVuZGVuY3lJbmplY3RvciwgSW5qZWN0YWJsZSwgU2hlbGwsIEFkbWluQXBpLCBUb2FzdGVyLCBSZXNvdXJjZUNvbnRhaW5lciwgTW9kYWwpIHtcclxuICAgIHZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKEFwcGxpY2F0aW9uLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zaGVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRpID0gdGhpcy5kZWNsYXJlU2VydmljZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5hcGkuaW5pdCgpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAga28udHJhY2socmVzLnVzZXIpO1xyXG4gICAgICAgICAgICAgICAgZGkuc2V0KCdyZXNvdXJjZXMnLCBuZXcgUmVzb3VyY2VDb250YWluZXIocmVzLnVzZXIsIHJlcy5jb25maWcpKTtcclxuICAgICAgICAgICAgICAgIHZhciBzaGVsbCA9IG5ldyBTaGVsbCgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hlbGwgPSBzaGVsbC5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzaGVsbC5sb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmRlY2xhcmVTZXJ2aWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRpID0gRGVwZW5kZW5jeUluamVjdG9yLmZhY3RvcnlEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGRpLnNldCgnYXBpJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEFkbWluQXBpKCk7IH0sIHRydWUpO1xyXG4gICAgICAgICAgICBkaS5zZXQoJ3RvYXN0ZXInLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVG9hc3RlcigpOyB9LCB0cnVlKTtcclxuICAgICAgICAgICAgZGkuc2V0KCdtb2RhbCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNb2RhbCgpOyB9LCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xyXG4gICAgfSkoSW5qZWN0YWJsZSk7XHJcbiAgICBLbm9ja291dEVsc2UuaW5pdCgpOyAvLyBrbm9ja291dC1lbHNlICAgIDogaHR0cHM6Ly9naXRodWIuY29tL2JyaWFubWh1bnQva25vY2tvdXQtZWxzZVxyXG4gICAga28ucHVuY2hlcy5lbmFibGVBbGwoKTsgLy8ga25vY2tvdXQtcHVuY2hlcyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYmVzdC9rbm9ja291dC5wdW5jaGVzXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXBwID0gbmV3IEFwcGxpY2F0aW9uKCk7XHJcbiAgICAgICAgd2luZG93WydhcHAnXSA9IGFwcDsgLy9mb3IgQ29uc29sZSBEZWJ1Zy5cclxuICAgICAgICBrby5hcHBseUJpbmRpbmdzKGFwcCk7XHJcbiAgICAgICAgYXBwLmluaXRpYWxpemUoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwbGljYXRpb24uanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL0FwcGxpY2F0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2RpL0RlcGVuZGVuY3lJbmplY3RhYmxlJywgJ3BhcnRzL3NpZGUtbmF2L1NpZGVOYXYnLCAncGFydHMvaGVhZGVyLW5hdi9IZWFkZXJOYXYnLCAncGFydHMvTWVudUl0ZW0nXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIEluamVjdGFibGUsIFNpZGVOYXYsIEhlYWRlck5hdiwgTWVudUl0ZW0pIHtcclxuICAgIHZhciBTaGVsbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFNoZWxsLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFNoZWxsKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zaWRlTmF2ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZU1hcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUlkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IHRoaXMubW9kYWw7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTaGVsbC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJvdXRlcyA9IHRoaXMuZGVjbGFyZVJvdXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlTWFwID0gRW51bWVyYWJsZS5mcm9tKHJvdXRlcykudG9PYmplY3QoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHIubmFtZTsgfSwgZnVuY3Rpb24gKHIpIHsgcmV0dXJuIHI7IH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVOYXYgPSBuZXcgU2lkZU5hdihFbnVtZXJhYmxlLmZyb20ocm91dGVzKS53aGVyZShmdW5jdGlvbiAocikgeyByZXR1cm4gci5uYXYgIT0gbnVsbCAmJiBfdGhpcy51c2VySGFzQ2xlYXJhbmNlT2Yoci5uYW1lKTsgfSkuc2VsZWN0KGZ1bmN0aW9uIChyKSB7IHJldHVybiBuZXcgTWVudUl0ZW0oci5uYW1lLCByLnBhdGgsIHIubmF2LmxhYmVsLCByLm5hdi5pY29uKTsgfSkudG9BcnJheSgpKTtcclxuICAgICAgICAgICAgcm91dGllKEVudW1lcmFibGUuZnJvbShyb3V0ZXMpLndoZXJlKGZ1bmN0aW9uIChyKSB7IHJldHVybiByLm5hdiA9PSBudWxsIHx8IF90aGlzLnVzZXJIYXNDbGVhcmFuY2VPZihyLm5hbWUpOyB9KS50b09iamVjdChmdW5jdGlvbiAocikgeyByZXR1cm4gci5wYXRoOyB9LCBmdW5jdGlvbiAocikgeyByZXR1cm4gci5oYW5kbGVyOyB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyTmF2ID0gbmV3IEhlYWRlck5hdigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFNoZWxsLnByb3RvdHlwZS51c2VySGFzQ2xlYXJhbmNlT2YgPSBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllciA9PT0gJ2hvbWUnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGhvbWUg44Gv54Sh5p2h5Lu244Gn6Kix5Y+vXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc291cmNlcy51c2VyLmlzX21hc3RlcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZXMudXNlci5jbGVhcmFuY2VzLmluZGV4T2YoaWRlbnRpZmllcikgPj0gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFNoZWxsLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZml4U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3BPZmZzZXQgPSA1MDtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IDApID8gd2luZG93LmlubmVyV2lkdGggOiBzY3JlZW4ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGggPCA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdkaXYubmF2YmFyLWNvbGxhcHNlJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wT2Zmc2V0ID0gMTAwOyAvLyAyLXJvdy1tZW51XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdkaXYubmF2YmFyLWNvbGxhcHNlJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCA+IDApID8gd2luZG93LmlubmVySGVpZ2h0IDogc2NyZWVuLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAtIHRvcE9mZnNldDtcclxuICAgICAgICAgICAgICAgIGlmIChoZWlnaHQgPCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVpZ2h0ID4gdG9wT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlLXdyYXBwZXJcIikuY3NzKFwibWluLWhlaWdodFwiLCAoaGVpZ2h0KSArIFwicHhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZpeFNpemUoKTtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmaXhTaXplKTtcclxuICAgICAgICAgICAgcm91dGllKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFNoZWxsLnByb3RvdHlwZS50cmFuc2l0ID0gZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5yb3V0ZU1hcFtuYW1lXS5wYWdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5sb2FkKGNvbnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVJZCA9IG5hbWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnI3BhZ2Utd3JhcHBlciA+IC5yb3cnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTaGVsbC5wcm90b3R5cGUuZGVjbGFyZVJvdXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogcmVxdWlyZSgncGFnZS9ob21lL0hvbWVQYWdlJykuZmFjdG9yeSxcclxuICAgICAgICAgICAgICAgICAgICBuYXY6IHsgbGFiZWw6ICdIb21lJywgaWNvbjogJ2ZvbGRlcicgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy50cmFuc2l0KCdob21lJywge30pOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzZXR0aW5ncycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogcmVxdWlyZSgncGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UnKS5mYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdzZXR0aW5ncycsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudHJhbnNpdCgnc2V0dGluZ3MnLCB7fSk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJlcXVpcmUoJ3BhZ2UvdXNlci9Vc2VyUGFnZScpLmZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3VzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnRyYW5zaXQoJ3VzZXInLCB7fSk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHJlcXVpcmUoJ3BhZ2UvY29udGFjdC9Db250YWN0UGFnZScpLmZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2OiB7IGxhYmVsOiAnQ29udGFjdCcsIGljb246ICdlbnZlbG9wZScgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY29udGFjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMudHJhbnNpdCgnY29udGFjdCcsIHt9KTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBTaGVsbDtcclxuICAgIH0pKEluamVjdGFibGUpO1xyXG4gICAgcmV0dXJuIFNoZWxsO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2hlbGwuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL1NoZWxsLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIERlcGVuZGVuY3lJbmplY3RvciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gRGVwZW5kZW5jeUluamVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkX2luc3RhbmNlcyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBEZXBlbmRlbmN5SW5qZWN0b3IuZ2V0RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBEZXBlbmRlbmN5SW5qZWN0b3Iuc2V0RGVmYXVsdCA9IGZ1bmN0aW9uIChfZGVmYXVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0ID0gX2RlZmF1bHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBEZXBlbmRlbmN5SW5qZWN0b3IuZmFjdG9yeURlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0ID0gbmV3IERlcGVuZGVuY3lJbmplY3RvcigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgRGVwZW5kZW5jeUluamVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZSwgc2hhcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXNbbmFtZV0gPSBzZXJ2aWNlO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLl9zaGFyZWQgPSBzaGFyZWQgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgRGVwZW5kZW5jeUluamVjdG9yLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobmFtZSwgc2hhcmVkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1NlcnZpY2UnICsgbmFtZSArICcgbm90IGZvdW5kLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlID0gdGhpcy5zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXJ2aWNlID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLl9zaGFyZWQgfHwgc2hhcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkX2luc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRfaW5zdGFuY2VzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkX2luc3RhbmNlc1tuYW1lXSA9IHNlcnZpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBEZXBlbmRlbmN5SW5qZWN0b3I7XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIERlcGVuZGVuY3lJbmplY3RvcjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlcGVuZGVuY3lJbmplY3Rvci5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGkvRGVwZW5kZW5jeUluamVjdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0RlcGVuZGVuY3lJbmplY3RvciddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgRGVwZW5kZW5jeUluamVjdG9yKSB7XHJcbiAgICB2YXIgRGVwZW5kZW5jeUluamVjdGFibGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIERlcGVuZGVuY3lJbmplY3RhYmxlKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVwZW5kZW5jeUluamVjdGFibGUucHJvdG90eXBlLCBcImRpXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2RpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEZXBlbmRlbmN5SW5qZWN0b3IuZ2V0RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGkgPSBkaTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlcGVuZGVuY3lJbmplY3RhYmxlLnByb3RvdHlwZSwgXCJhcGlcIiwge1xyXG4gICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBzZXJ2aWNlcyBnZXR0ZXJzXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGkuZ2V0KCdhcGknKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlcGVuZGVuY3lJbmplY3RhYmxlLnByb3RvdHlwZSwgXCJyZXNvdXJjZXNcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpLmdldCgncmVzb3VyY2VzJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZXBlbmRlbmN5SW5qZWN0YWJsZS5wcm90b3R5cGUsIFwidG9hc3RlclwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGkuZ2V0KCd0b2FzdGVyJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZXBlbmRlbmN5SW5qZWN0YWJsZS5wcm90b3R5cGUsIFwibW9kYWxcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpLmdldCgnbW9kYWwnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIERlcGVuZGVuY3lJbmplY3RhYmxlO1xyXG4gICAgfSkoKTtcclxuICAgIHJldHVybiBEZXBlbmRlbmN5SW5qZWN0YWJsZTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlcGVuZGVuY3lJbmplY3RhYmxlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaS9EZXBlbmRlbmN5SW5qZWN0YWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0FwaUJhc2UnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIEFwaUJhc2UpIHtcclxuICAgIHZhciBBZG1pbkFwaSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKEFkbWluQXBpLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIEFkbWluQXBpKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQWRtaW5BcGkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXQoJ2FwaS9pbml0Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBZG1pbkFwaS5wcm90b3R5cGUuc3VjY2Vzc0R1bW15ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KCdhcGkvc3VjY2Vzc0R1bW15Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBBZG1pbkFwaS5wcm90b3R5cGUuZ2V0VXNlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXQoJ2FwaS9nZXRVc2VycycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQWRtaW5BcGkucHJvdG90eXBlLmdldE1lc3NhZ2VzID0gZnVuY3Rpb24gKG9mZnNldCwgbGltaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldCgnYXBpL2dldE1lc3NhZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBsaW1pdDogbGltaXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gQWRtaW5BcGk7XHJcbiAgICB9KShBcGlCYXNlKTtcclxuICAgIHJldHVybiBBZG1pbkFwaTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFkbWluQXBpLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9BZG1pbkFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcclxuICAgIHZhciBUb2FzdGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBUb2FzdGVyKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb2FzdGVyLnByb3RvdHlwZS5zdWNjZXNzID0gZnVuY3Rpb24gKHRpdGxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ3N1Y2Nlc3MnLCB0aXRsZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUb2FzdGVyLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24gKHRpdGxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ2luZm8nLCB0aXRsZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUb2FzdGVyLnByb3RvdHlwZS53YXJuaW5nID0gZnVuY3Rpb24gKHRpdGxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ3dhcm5pbmcnLCB0aXRsZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUb2FzdGVyLnByb3RvdHlwZS5kYW5nZXIgPSBmdW5jdGlvbiAodGl0bGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgnZGFuZ2VyJywgdGl0bGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVG9hc3Rlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhbmdlcign44Ko44Op44O8JywgbWVzc2FnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUb2FzdGVyLnByb3RvdHlwZS50b2FzdCA9IGZ1bmN0aW9uIChwcmlvcml0eSwgdGl0bGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgJC50b2FzdGVyKHtcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gVG9hc3RlcjtcclxuICAgIH0pKCk7XHJcbiAgICByZXR1cm4gVG9hc3RlcjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRvYXN0ZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL1RvYXN0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XHJcbiAgICB2YXIgUmVzb3VyY2VDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlQ29udGFpbmVyKHVzZXIsIGNvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlQ29udGFpbmVyO1xyXG4gICAgfSkoKTtcclxuICAgIHJldHVybiBSZXNvdXJjZUNvbnRhaW5lcjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlc291cmNlQ29udGFpbmVyLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9SZXNvdXJjZUNvbnRhaW5lci5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi8uLi9Db21wb25lbnQnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIENvbXBvbmVudCkge1xyXG4gICAgdmFyIE1vZGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoTW9kYWwsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gTW9kYWwoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TdXNwZW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd24gPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93bi5zdWJzY3JpYmUoZnVuY3Rpb24gKHNob3duKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNob3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDjg6Ljg7zjg4Djg6vjg4DjgqTjgqLjg63jgrDjga7mqKrluYXjgrXjgqTjgrrjgpLlpInmm7RcclxuICAgICAgICAgKiBAcGFyYW0gc2l6ZSAnbGFyZ2UnIOOBvuOBn+OBryAnc21hbGwnXHJcbiAgICAgICAgICogQHJldHVybnMge01vZGFsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKHNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0gdGVtcGxhdGUg44OG44Oz44OX44Os44O844OISURcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSDjg5DjgqTjg7Pjg4njgZnjgovjg4fjg7zjgr/jgrPjg7Pjg4bjgq3jgrnjg4jjgb7jgZ/jga8gVmlld01vZGVsXHJcbiAgICAgICAgICogQHJldHVybnMge01vZGFsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5zZXRDdXN0b21IZWFkZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSB7IG5hbWU6IHRlbXBsYXRlLCBkYXRhOiBkYXRhIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHRlbXBsYXRlIOODhuODs+ODl+ODrOODvOODiElEXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEg44OQ44Kk44Oz44OJ44GZ44KL44OH44O844K/44Kz44Oz44OG44Kt44K544OI44G+44Gf44GvIFZpZXdNb2RlbFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtNb2RhbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0Q3VzdG9tQm9keSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHkgPSB7IG5hbWU6IHRlbXBsYXRlLCBkYXRhOiBkYXRhIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHRlbXBsYXRlIOODhuODs+ODl+ODrOODvOODiElEXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEg44OQ44Kk44Oz44OJ44GZ44KL44OH44O844K/44Kz44Oz44OG44Kt44K544OI44G+44Gf44GvIFZpZXdNb2RlbFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtNb2RhbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0Q3VzdG9tRm9vdGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyID0geyBuYW1lOiB0ZW1wbGF0ZSwgZGF0YTogZGF0YSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5zZXRIZWFkZXIgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q3VzdG9tSGVhZGVyKCdtb2RhbEhlYWRlcicsIHsgbGFiZWw6IGxhYmVsIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9kYWwucHJvdG90eXBlLnNldEJvZHkgPSBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRDdXN0b21Cb2R5KCdtb2RhbEJvZHknLCB7IGNvbnRlbnQ6IGNvbnRlbnQgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2RhbC5wcm90b3R5cGUuc2V0Rm9vdGVyID0gZnVuY3Rpb24gKGFjdGlvbiwgcHJpbWFyeUxhYmVsLCBjbG9zZUxhYmVsKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5TGFiZWw6IHByaW1hcnlMYWJlbCxcclxuICAgICAgICAgICAgICAgIGNsb3NlTGFiZWw6IGNsb3NlTGFiZWwsXHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcjogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAga28udHJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEN1c3RvbUZvb3RlcignbW9kYWxGb290ZXInLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcclxuICAgICAgICAgICAgaWYgKGFyZzEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXIoYXJnMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJvZHkoYXJnMik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Rm9vdGVyKGFyZzMsIGFyZzQgfHwgJ09LJywgYXJnNSB8fCAnQ2FuY2VsJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZvb3RlcihudWxsLCAnJywgYXJnMyB8fCAnT0snKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob3duKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93bihmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIE1vZGFsO1xyXG4gICAgfSkoQ29tcG9uZW50KTtcclxuICAgIENvbXBvbmVudC5yZWdpc3RlcignbW9kYWwnLCBNb2RhbCwgcmVxdWlyZSgnLi9Nb2RhbC5odG1sJykpO1xyXG4gICAgcmV0dXJuIE1vZGFsO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TW9kYWwuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL21vZGFsL01vZGFsLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIE1lbnVJdGVtID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBNZW51SXRlbShuYW1lLCBwYXRoLCBsYWJlbCwgaWNvbikge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWVudUl0ZW07XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIE1lbnVJdGVtO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVudUl0ZW0uanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL01lbnVJdGVtLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIEFwaUJhc2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEFwaUJhc2UoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5fcHJlUHJvY2VzcyA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yICYmIGNvbnNvbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5hdXRoX3JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnbG9naW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5fdG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3Rva2VuID0gcmVzcG9uc2UuX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFwaUJhc2UucHJvdG90eXBlLl9jb21tdW5pY2F0aW9uRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi6YCa5L+h44Ko44Op44O8XCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBpQmFzZS5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSlcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgZGF0YS5fdG9rZW4gPSB0aGlzLl90b2tlbjtcclxuICAgICAgICAgICAgcmV0dXJuICQuYWpheCh1cmwsIHsgdHlwZTogJ2dldCcsIGRhdGE6IGRhdGEsIHN1Y2Nlc3M6IGNhbGxiYWNrIH0pLnRoZW4odGhpcy5fcHJlUHJvY2VzcywgdGhpcy5fY29tbXVuaWNhdGlvbkVycm9yKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCDjg6rjgq/jgqjjgrnjg4jjgpLpgIHkv6FcclxuICAgICAgICAgKi9cclxuICAgICAgICBBcGlCYXNlLnByb3RvdHlwZS5fcG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsICRmaWxlcywgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGF0YSA9ICQuZXh0ZW5kKHsgX3Rva2VuOiB0aGlzLl90b2tlbiB9LCBkYXRhKTtcclxuICAgICAgICAgICAgaWYgKCRmaWxlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIGRhdGFbJ19yZXNwb25zZV9hcyddID0gJ3RleHQvaHRtbCc7XHJcbiAgICAgICAgICAgICAgICAkZmlsZXMudXBsb2FkKHVybCwgZGF0YSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKGRmZCwgW3Jlc3BvbnNlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAnanNvbicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRmZC50aGVuKHRoaXMuX3ByZVByb2Nlc3MsIHRoaXMuX2NvbW11bmljYXRpb25FcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydfcmVzcG9uc2VfYXMnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLmFqYXgodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4odGhpcy5fcHJlUHJvY2VzcywgdGhpcy5fY29tbXVuaWNhdGlvbkVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBpQmFzZS5wcm90b3R5cGUuX3NlcmlhbGl6ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrby51dGlscy5zdHJpbmdpZnlKc29uKGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIEFwaUJhc2U7XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIEFwaUJhc2U7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcGlCYXNlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9BcGlCYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uLy4uL0NvbXBvbmVudCddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgQ29tcG9uZW50KSB7XHJcbiAgICB2YXIgU2lkZU5hdiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFNpZGVOYXYsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gU2lkZU5hdihtZW51KSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBtZW51O1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2lkZU5hdi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd24gPSAhdGhpcy5pc1Nob3duO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFNpZGVOYXY7XHJcbiAgICB9KShDb21wb25lbnQpO1xyXG4gICAgcmVxdWlyZSgnLi9TaWRlTmF2Lmxlc3MnKTtcclxuICAgIENvbXBvbmVudC5yZWdpc3Rlcignc2lkZS1uYXYnLCBTaWRlTmF2LCByZXF1aXJlKCcuL1NpZGVOYXYuaHRtbCcpKTtcclxuICAgIHJldHVybiBTaWRlTmF2O1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2lkZU5hdi5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvc2lkZS1uYXYvU2lkZU5hdi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vLi4vQ29tcG9uZW50J10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBDb21wb25lbnQpIHtcclxuICAgIHZhciBIZWFkZXJOYXYgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhIZWFkZXJOYXYsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gSGVhZGVyTmF2KCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBIZWFkZXJOYXY7XHJcbiAgICB9KShDb21wb25lbnQpO1xyXG4gICAgQ29tcG9uZW50LnJlZ2lzdGVyKCdoZWFkZXItbmF2JywgSGVhZGVyTmF2LCByZXF1aXJlKCcuL0hlYWRlck5hdi5odG1sJykpO1xyXG4gICAgcmV0dXJuIEhlYWRlck5hdjtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUhlYWRlck5hdi5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvaGVhZGVyLW5hdi9IZWFkZXJOYXYuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2RpL0RlcGVuZGVuY3lJbmplY3RhYmxlJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBJbmplY3RhYmxlKSB7XHJcbiAgICB2YXIgQ29tcG9uZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoQ29tcG9uZW50LCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBvbmVudC5yZWdpc3RlciA9IGZ1bmN0aW9uIChuYW1lLCBrbGFzcywgdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAga28uY29tcG9uZW50cy5yZWdpc3RlcihuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICB2aWV3TW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVWaWV3TW9kZWw6IGZ1bmN0aW9uIChwYXJhbXMsIGNvbXBvbmVudEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcyBpbnN0YW5jZW9mIGtsYXNzID8gcGFyYW1zIDoga28udW53cmFwKHBhcmFtcy5vcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gQ29tcG9uZW50O1xyXG4gICAgfSkoSW5qZWN0YWJsZSk7XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcG9uZW50LmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9Db21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL1BhZ2UnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIFBhZ2UpIHtcclxuICAgIHZhciBjb21wb25lbnRJZCA9ICdob21lLXBhZ2UnO1xyXG4gICAgdmFyIEhvbWVQYWdlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoSG9tZVBhZ2UsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gSG9tZVBhZ2UoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJLTyArIFR5cGVTY3JpcHQg44Gn5aSn6KaP5qihIFNQQSDplovnmbpcIjtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJZCA9IGNvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSG9tZVBhZ2UuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSA9IG5ldyBIb21lUGFnZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSG9tZVBhZ2UuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBIb21lUGFnZTtcclxuICAgIH0pKFBhZ2UpO1xyXG4gICAgcmVxdWlyZSgnLi9Ib21lUGFnZS5sZXNzJyk7XHJcbiAgICBQYWdlLnJlZ2lzdGVyKGNvbXBvbmVudElkLCBIb21lUGFnZSwgcmVxdWlyZSgnLi9Ib21lUGFnZS5odG1sJykpO1xyXG4gICAgcmV0dXJuIEhvbWVQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SG9tZVBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvaG9tZS9Ib21lUGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vUGFnZScsICcuLi9QYXJ0aWFsVmlld01vZGVsJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBQYWdlLCBQYXJ0aWFsVmlld01vZGVsKSB7XHJcbiAgICB2YXIgY29tcG9uZW50SWQgPSBcInNldHRpbmdzLXBhZ2VcIjtcclxuICAgIHZhciBTZXR0aW5nc1BhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhTZXR0aW5nc1BhZ2UsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gU2V0dGluZ3NQYWdlKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWRpdG9yID0gbmV3IFByb2ZpbGVFZGl0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXNzd29yZENoYW5nZXIgPSBuZXcgUGFzc3dvcmRDaGFuZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldHRpbmdzUGFnZS5mYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlID0gbmV3IFNldHRpbmdzUGFnZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU2V0dGluZ3NQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRWRpdG9yLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRDaGFuZ2VyLnJlc2V0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTZXR0aW5nc1BhZ2UuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBTZXR0aW5nc1BhZ2U7XHJcbiAgICB9KShQYWdlKTtcclxuICAgIFBhZ2UucmVnaXN0ZXIoY29tcG9uZW50SWQsIFNldHRpbmdzUGFnZSwgcmVxdWlyZSgnLi9TZXR0aW5nc1BhZ2UuaHRtbCcpKTtcclxuICAgIHZhciBQcm9maWxlRWRpdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoUHJvZmlsZUVkaXRvciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQcm9maWxlRWRpdG9yKCkge1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJvZmlsZUVkaXRvci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zYXZpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5kYW5nZXIoXCLlpLHmlZdcIiwgcmVzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLnN1Y2Nlc3MoXCLlrozkuoZcIiwgXCLjg5fjg63jg5XjgqHjgqTjg6vjgpLmm7TmlrDjgZfjgb7jgZfjgZ9cIik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseSgpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUHJvZmlsZUVkaXRvci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucmVzb3VyY2VzLnVzZXIubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLnJlc291cmNlcy51c2VyLmVtYWlsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9maWxlRWRpdG9yLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMudXNlci5uYW1lID0gdGhpcy5wcm9maWxlLm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzLnVzZXIuZW1haWwgPSB0aGlzLnByb2ZpbGUuZW1haWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUHJvZmlsZUVkaXRvcjtcclxuICAgIH0pKFBhcnRpYWxWaWV3TW9kZWwpO1xyXG4gICAgdmFyIFBhc3N3b3JkQ2hhbmdlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFBhc3N3b3JkQ2hhbmdlciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBQYXNzd29yZENoYW5nZXIoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5uZXdfcGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VyLnByb3RvdHlwZS5jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5ld19wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZF9jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ZXIud2FybmluZyhcIuOCqOODqeODvFwiLCBcIueiuuiqjeODkeOCueODr+ODvOODieOBjOS4gOiHtOOBl+OBvuOBm+OCk1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNhdmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpLnN1Y2Nlc3NEdW1teSgpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLmRhbmdlcihcIuWkseaVl1wiLCByZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuc3VjY2VzcyhcIuWujOS6hlwiLCBcIuODkeOCueODr+ODvOODieOCkuWkieabtOOBl+OBvuOBl+OBn1wiKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYXNzd29yZENoYW5nZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5uZXdfcGFzc3dvcmQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFBhc3N3b3JkQ2hhbmdlcjtcclxuICAgIH0pKFBhcnRpYWxWaWV3TW9kZWwpO1xyXG4gICAgcmV0dXJuIFNldHRpbmdzUGFnZTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNldHRpbmdzUGFnZS5qcy5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL1BhZ2UnLCAnLi4vUGFydGlhbFZpZXdNb2RlbCcsICcuLi8uLi9wYXJ0cy9WYWxpZGF0aW9uJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBQYWdlLCBQYXJ0aWFsVmlld01vZGVsLCBWYWxpZGF0aW9uKSB7XHJcbiAgICB2YXIgY29tcG9uZW50SWQgPSAndXNlci1wYWdlJztcclxuICAgIHZhciBVc2VyUGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFVzZXJQYWdlLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFVzZXJQYWdlKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBuZXcgVXNlckVkaXRvcih1c2VyKTtcclxuICAgICAgICAgICAgICAgIHZhciBleGVjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci52YWxpZGF0aW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlZGl0b3IudmFsaWRhdGlvbi5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tb2RhbC5hY3Rpb25TdXNwZW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuZGFuZ2VyKCfjgqjjg6njg7wnLCByZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvYXN0ZXIuc3VjY2Vzcygn5a6M5LqGJywgJ+ODpuODvOOCtuaDheWgseOCkuabtOaWsOOBl+OBvuOBl+OBnycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuc2V0SGVhZGVyKCfjg6bjg7zjgrbnt6jpm4YnKS5zZXRDdXN0b21Cb2R5KCd1c2VyRWRpdG9yTW9kYWxCb2R5JywgZWRpdG9yKS5zZXRGb290ZXIoZXhlYywgJ+S/neWtmCcsICfjgq3jg6Pjg7Pjgrvjg6snKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHVzZXIuZW5hYmxlZCA9ICF1c2VyLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcGkuc3VjY2Vzc0R1bW15KCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5lcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleGVjID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmFjdGlvblN1c3BlbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBpLnN1Y2Nlc3NEdW1teSgpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5lcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmFjdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLnNldEhlYWRlcign44Om44O844K25YmK6ZmkJykuc2V0Qm9keSh1c2VyLm5hbWUgKyAnIChpZDonICsgdXNlci5sb2dpbiArICcpIOOCkuWJiumZpOOBl+OBvuOBmeOAgjxicj7mnKzlvZPjgavjgojjgo3jgZfjgYTjgafjgZnjgYvvvJ8nKS5zZXRGb290ZXIoZXhlYywgJ+OBr+OBhCcsICfjgYTjgYTjgYgnKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcclxuICAgICAgICAgICAga28udHJhY2sodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVzZXJQYWdlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlclBhZ2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpLmdldFVzZXJzKCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy51c2VycyA9IHJlcy51c2VycztcclxuICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVc2VyUGFnZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZWRpdG9yID0gbmV3IFVzZXJFZGl0b3IoKTtcclxuICAgICAgICAgICAgdmFyIGV4ZWMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0b3IudmFsaWRhdGlvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlZGl0b3IudmFsaWRhdGlvbi5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFwaS5zdWNjZXNzRHVtbXkoKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b2FzdGVyLmRhbmdlcign44Ko44Op44O8JywgcmVzLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9hc3Rlci5zdWNjZXNzKCflrozkuoYnLCAn44Om44O844K244KS6L+95Yqg44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubW9kYWwuYWN0aW9uU3VzcGVuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbC5zZXRIZWFkZXIoJ+ODpuODvOOCtui/veWKoCcpLnNldEN1c3RvbUJvZHkoJ3VzZXJFZGl0b3JNb2RhbEJvZHknLCBlZGl0b3IpLnNldEZvb3RlcihleGVjLCAn6L+95YqgJywgJ+OCreODo+ODs+OCu+ODqycpLnNob3coKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFVzZXJQYWdlLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gVXNlclBhZ2U7XHJcbiAgICB9KShQYWdlKTtcclxuICAgIHZhciBVc2VyRWRpdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoVXNlckVkaXRvciwgX3N1cGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBVc2VyRWRpdG9yKHVzZXIpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkX2NvbmZpcm0gPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyYW5jZV9vcHRpb25zID0gW1xyXG4gICAgICAgICAgICAgICAgeyBrZXk6ICdjb250YWN0JywgbmFtZTogJ+WVj+OBhOWQiOOCj+OBmycgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiAnbWVtYmVyJywgbmFtZTogJ+S8muWToeeuoeeQhicgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gdXNlciA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0ga28udXRpbHMuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgbG9naW46ICcnLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJycsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2xlYXJhbmNlczogW11cclxuICAgICAgICAgICAgfSwgdXNlciA/IHVzZXIgOiB7fSk7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMudXNlcik7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlcjtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gbmV3IFZhbGlkYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbG9naW46IGtvLmdldE9ic2VydmFibGUodXNlciwgJ2xvZ2luJykuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfnhKHlirnjgarjg6bjg7zjgrZJROOBp+OBmScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogJ15bYS16QS1aMC05X10rJCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBrby5nZXRPYnNlcnZhYmxlKHVzZXIsICdwYXNzd29yZCcpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICF0aGlzLmVkaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogNjRcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybToga28uZ2V0T2JzZXJ2YWJsZSh0aGlzLCAncGFzc3dvcmRfY29uZmlybScpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICF0aGlzLmVkaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZXF1YWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBrby5nZXRPYnNlcnZhYmxlKHVzZXIsICdwYXNzd29yZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAn44OR44K544Ov44O844OJ44GM5LiA6Ie044GX44G+44Gb44KTJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmFtZToga28uZ2V0T2JzZXJ2YWJsZSh1c2VyLCAnbmFtZScpLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiAyMFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBlbWFpbDoga28uZ2V0T2JzZXJ2YWJsZSh1c2VyLCAnZW1haWwnKS5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogMjU1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXNlckVkaXRvci5wcm90b3R5cGUuaGFzQ2xlYXJhbmNlT2YgPSBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLmNsZWFyYW5jZXMuaW5kZXhPZihpZGVudGlmaWVyKSA+PSAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXNlckVkaXRvci5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBVc2VyRWRpdG9yO1xyXG4gICAgfSkoUGFydGlhbFZpZXdNb2RlbCk7XHJcbiAgICBQYWdlLnJlZ2lzdGVyKGNvbXBvbmVudElkLCBVc2VyUGFnZSwgcmVxdWlyZSgnLi9Vc2VyUGFnZS5odG1sJykpO1xyXG4gICAgcmV0dXJuIFVzZXJQYWdlO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXNlclBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvdXNlci9Vc2VyUGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgX19leHRlbmRzID0gdGhpcy5fX2V4dGVuZHMgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcclxuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XHJcbn07XHJcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vUGFnZScsICcuLi8uLi9wYXJ0cy9wYWdlci9QYWdlciddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgUGFnZSwgUGFnZXIpIHtcclxuICAgIHZhciBjb21wb25lbnRJZCA9ICdjb250YWN0LXBhZ2UnO1xyXG4gICAgdmFyIENvbnRhY3RQYWdlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoQ29udGFjdFBhZ2UsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gQ29udGFjdFBhZ2UoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJDb250YWN0XCI7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdlci5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFwaS5nZXRNZXNzYWdlcyhfdGhpcy5wYWdlci5vZmZzZXQsIF90aGlzLnBhZ2VyLnNpemUpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBhZ2VyLmNvdW50ID0gcmVzLmNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1lc3NhZ2VzID0gcmVzLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wYWdlci5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGFsLnNldEhlYWRlcign44Oh44OD44K744O844K4Jykuc2V0Q3VzdG9tQm9keSgnbWVzc2FnZU1vZGFsQm9keScsIG1lc3NhZ2UpLnNldEZvb3RlcihudWxsLCAnJywgJ+mWieOBmOOCiycpLnNob3coKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJZCA9IGNvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBrby50cmFjayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlciA9IG5ldyBQYWdlcihrby5nZXRPYnNlcnZhYmxlKHRoaXMsICdtZXNzYWdlcycpLCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbnRhY3RQYWdlLmZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29udGFjdFBhZ2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIENvbnRhY3RQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAga28uY29tcHV0ZWQodGhpcy5yZWxvYWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgQ29udGFjdFBhZ2UuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBDb250YWN0UGFnZTtcclxuICAgIH0pKFBhZ2UpO1xyXG4gICAgUGFnZS5yZWdpc3Rlcihjb21wb25lbnRJZCwgQ29udGFjdFBhZ2UsIHJlcXVpcmUoJy4vQ29udGFjdFBhZ2UuaHRtbCcpKTtcclxuICAgIHJldHVybiBDb250YWN0UGFnZTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbnRhY3RQYWdlLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWdlL2NvbnRhY3QvQ29udGFjdFBhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcIm1vZGFsXFxcIiBjbGFzcz1cXFwibW9kYWwgZmFkZVxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiByb2xlPVxcXCJkaWFsb2dcXFwiXFxyXFxuXFx0XFx0IGRhdGEtYmluZD1cXFwibW9kYWxTaG93bjogc2hvd25cXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcIm1vZGFsLWRpYWxvZ1xcXCIgZGF0YS1iaW5kPVxcXCJjc3M6eyBtb2RhbC1sZzogc2l6ZSA9PSAnbGFyZ2UnLCBtb2RhbC1zbTogc2l6ZSA9PSAnc21hbGwnIH1cXFwiPlxcclxcblxcdFxcdDxkaXYgY2xhc3M9XFxcIm1vZGFsLWNvbnRlbnRcXFwiPlxcclxcblxcdFxcdFxcdHt7I2lmIGhlYWRlciB9fVxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZW1wbGF0ZTogaGVhZGVyXFxcIj48L2Rpdj5cXHJcXG5cXHRcXHRcXHR7ey9pZn19XFxyXFxuXFx0XFx0XFx0e3sjaWYgYm9keSB9fVxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIm1vZGFsLWJvZHlcXFwiIGRhdGEtYmluZD1cXFwidGVtcGxhdGU6IGJvZHlcXFwiPjwvZGl2PlxcclxcblxcdFxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHRcXHR7eyNpZiBmb290ZXIgJiYgIWFjdGlvblN1c3BlbmRlZCB9fVxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIm1vZGFsLWZvb3RlclxcXCIgZGF0YS1iaW5kPVxcXCJ0ZW1wbGF0ZTogZm9vdGVyXFxcIj48L2Rpdj5cXHJcXG5cXHRcXHRcXHR7ey9pZn19XFxyXFxuXFx0XFx0XFx0e3sjaWYgYWN0aW9uU3VzcGVuZGVkIH19XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibW9kYWwtZm9vdGVyXFxcIiBkYXRhLWJpbmQ9XFxcInRlbXBsYXRlOnsgbmFtZTogJ3N1c3BlbmRlZE1vZGFsRm9vdGVyJyB9XFxcIj48L2Rpdj5cXHJcXG5cXHRcXHRcXHR7ey9pZn19XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPHNjcmlwdCB0eXBlPVxcXCJ0ZXh0L2h0bWxcXFwiIGlkPVxcXCJtb2RhbEhlYWRlclxcXCI+XFxyXFxuXFx0PGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJtb2RhbFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9idXR0b24+XFxyXFxuXFx0PGgzIGRhdGEtYmluZD1cXFwidGV4dDogbGFiZWxcXFwiPjwvaDM+XFxyXFxuPC9zY3JpcHQ+XFxyXFxuPHNjcmlwdCB0eXBlPVxcXCJ0ZXh0L2h0bWxcXFwiIGlkPVxcXCJtb2RhbEJvZHlcXFwiPlxcclxcblxcdDxkaXYgZGF0YS1iaW5kPVxcXCJodG1sOiBjb250ZW50XFxcIj48L2Rpdj5cXHJcXG48L3NjcmlwdD5cXHJcXG48c2NyaXB0IHR5cGU9XFxcInRleHQvaHRtbFxcXCIgaWQ9XFxcIm1vZGFsRm9vdGVyXFxcIj5cXHJcXG5cXHQ8c3BhbiBjbGFzcz1cXFwidGV4dC1kYW5nZXJcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogaGFzRXJyb3JcXFwiPuOCqOODqeODvOOBjOOBguOCiuOBvuOBmeOAguioguato+OBl+OBpuOBj+OBoOOBleOBhOOAgjwvc3Bhbj5cXHJcXG5cXHR7eyNpZiAkZGF0YS5hY3Rpb24gfX1cXHJcXG5cXHQ8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBhY3Rpb24sIGh0bWw6IHByaW1hcnlMYWJlbFxcXCI+PC9hPlxcclxcblxcdHt7L2lmfX1cXHJcXG5cXHQ8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiBkYXRhLWJpbmQ9XFxcImh0bWw6IGNsb3NlTGFiZWxcXFwiIGRhdGEtZGlzbWlzcz1cXFwibW9kYWxcXFwiPjwvYT5cXHJcXG48L3NjcmlwdD5cXHJcXG48c2NyaXB0IHR5cGU9XFxcInRleHQvaHRtbFxcXCIgaWQ9XFxcInN1c3BlbmRlZE1vZGFsRm9vdGVyXFxcIj5cXHJcXG5cXHQ8aSBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXFxcIj48L2k+XFxyXFxuPC9zY3JpcHQ+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL21vZGFsL01vZGFsLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1kZWZhdWx0IHNpZGViYXJcXFwiIHJvbGU9XFxcIm5hdmlnYXRpb25cXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcInNpZGViYXItbmF2IG5hdmJhci1jb2xsYXBzZVxcXCI+XFxyXFxuXFx0XFx0PHVsIGNsYXNzPVxcXCJuYXZcXFwiIGlkPVxcXCJzaWRlLW1lbnVcXFwiPlxcclxcblxcdFxcdFxcdHt7I2ZvcmVhY2ggbWVudX19XFxyXFxuXFx0XFx0XFx0PGxpPlxcclxcblxcdFxcdFxcdFxcdDxhIGhyZWY9XFxcIiN7e3BhdGh9fVxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6eyBhY3RpdmU6ICRwYXJlbnRzWzFdLm1lbnVJZCA9PSBuYW1lIH1cXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS17e2ljb259fVxcXCI+PC9pPiB7e2xhYmVsfX1cXHJcXG5cXHRcXHRcXHRcXHQ8L2E+XFxyXFxuXFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHR7ey9mb3JlYWNofX1cXHJcXG5cXHRcXHQ8L3VsPlxcclxcblxcdDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9zaWRlLW5hdi9TaWRlTmF2Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1oZWFkZXJcXFwiPlxcclxcblxcdDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZVxcXCIgZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIiBkYXRhLXRhcmdldD1cXFwiLm5hdmJhci1jb2xsYXBzZVxcXCI+XFxyXFxuXFx0XFx0PHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxcclxcblxcdFxcdDxzcGFuIGNsYXNzPVxcXCJpY29uLWJhclxcXCI+PC9zcGFuPlxcclxcblxcdFxcdDxzcGFuIGNsYXNzPVxcXCJpY29uLWJhclxcXCI+PC9zcGFuPlxcclxcblxcdFxcdDxzcGFuIGNsYXNzPVxcXCJpY29uLWJhclxcXCI+PC9zcGFuPlxcclxcblxcdDwvYnV0dG9uPlxcclxcblxcdDxhIGNsYXNzPVxcXCJuYXZiYXItYnJhbmRcXFwiIGhyZWY9XFxcIi4vXFxcIj57eyByZXNvdXJjZXMuY29uZmlnLmxhYmVsLmFwcF90aXRsZSB9fTwvYT5cXHJcXG48L2Rpdj48IS0tIC8ubmF2YmFyLWhlYWRlciAtLT5cXHJcXG5cXHJcXG48dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItdG9wLWxpbmtzIG5hdmJhci1yaWdodFxcXCI+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJkcm9wZG93blxcXCI+XFxyXFxuXFx0XFx0PGEgY2xhc3M9XFxcImRyb3Bkb3duLXRvZ2dsZVxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIiBocmVmPVxcXCIjXFxcIj5cXHJcXG5cXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtdXNlciBmYS1md1xcXCI+PC9pPiB7eyByZXNvdXJjZXMudXNlci5uYW1lIH19IDxpIGNsYXNzPVxcXCJmYSBmYS1jYXJldC1kb3duXFxcIj48L2k+XFxyXFxuXFx0XFx0PC9hPlxcclxcblxcdFxcdDx1bCBjbGFzcz1cXFwiZHJvcGRvd24tbWVudSBkcm9wZG93bi11c2VyXFxcIj5cXHJcXG5cXHRcXHRcXHQ8bGk+PGEgaHJlZj1cXFwiI3NldHRpbmdzXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZ2VhciBmYS1md1xcXCI+PC9pPiDjgqLjgqvjgqbjg7Pjg4joqK3lrpo8L2E+PC9saT5cXHJcXG5cXHRcXHRcXHR7eyNpZiByZXNvdXJjZXMudXNlci5pc19tYXN0ZXJ9fVxcclxcblxcdFxcdFxcdDxsaT48YSBocmVmPVxcXCIjdXNlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXVzZXJzIGZhLWZ3XFxcIj48L2k+IOODpuODvOOCtueuoeeQhjwvYT48L2xpPlxcclxcblxcdFxcdFxcdHt7L2lmfX1cXHJcXG5cXHRcXHRcXHQ8bGkgY2xhc3M9XFxcImRpdmlkZXJcXFwiPjwvbGk+XFxyXFxuXFx0XFx0XFx0PGxpPjxhIGhyZWY9XFxcIiNcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1zaWduLW91dCBmYS1md1xcXCI+PC9pPiDjg63jgrDjgqLjgqbjg4g8L2E+PC9saT5cXHJcXG5cXHRcXHQ8L3VsPjwhLS0gLy5kcm9wZG93bi11c2VyIC0tPlxcclxcblxcdDwvbGk+PCEtLSAvLmRyb3Bkb3duIC0tPlxcclxcbjwvdWw+PCEtLSAvLm5hdmJhci10b3AtbGlua3MgLS0+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL2hlYWRlci1uYXYvSGVhZGVyTmF2Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF9fZXh0ZW5kcyA9IHRoaXMuX19leHRlbmRzIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XHJcbiAgICBkLnByb3RvdHlwZSA9IG5ldyBfXygpO1xyXG59O1xyXG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL0NvbXBvbmVudCddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgQ29tcG9uZW50KSB7XHJcbiAgICB2YXIgUGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICAgICAgX19leHRlbmRzKFBhZ2UsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gUGFnZSgpIHtcclxuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOODmuODvOOCuOWQjeOCkuWPluW+l+OBmeOCi+ODoeOCveODg+ODiVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFBhZ2UucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0TmFtZSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog44Oa44O844K444GU44Go44Gu44OG44Oz44OX44Os44O844OISUTjgpLlj5blvpfjgZnjgovjg6Hjgr3jg4Pjg4lcclxuICAgICAgICAgKi9cclxuICAgICAgICBQYWdlLnByb3RvdHlwZS5nZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRUZW1wbGF0ZSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YG356e75b6M44Gr5ZG844Gz5Ye644GV44KM44KL44Kk44OZ44Oz44OI44Oh44K944OD44OJXHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRleHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBQYWdlLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFBhZ2UuZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWN0b3J5IG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUGFnZTtcclxuICAgIH0pKENvbXBvbmVudCk7XHJcbiAgICByZXR1cm4gUGFnZTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBhZ2UuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvUGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcdFxcdDxoMSBjbGFzcz1cXFwicGFnZS1oZWFkZXJcXFwiPnt7dGl0bGV9fTwvaDE+XFxyXFxuXFx0XFx0PHVsPlxcclxcblxcdFxcdFxcdDxsaT5cXHJcXG5cXHRcXHRcXHRcXHQ8YSBocmVmPVxcXCJodHRwOi8vcWlpdGEuY29tL3N1a29idXRvL2l0ZW1zLzM5MmQzNWMxYTcxNzBjMTQzMjc4XFxcIj7ntLnku4voqJjkuovjga/jgZPjgaHjgok8L2E+XFxyXFxuXFx0XFx0XFx0PC9saT5cXHJcXG5cXHRcXHRcXHQ8bGk+XFxyXFxuXFx0XFx0XFx0XFx0PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3N1a29idXRvL2tvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFwiPkdpdGh1YjwvYT5cXHJcXG5cXHRcXHRcXHQ8L2xpPlxcclxcblxcdFxcdDwvdWw+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9kaXY+XCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhZ2UvaG9tZS9Ib21lUGFnZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9kaS9EZXBlbmRlbmN5SW5qZWN0YWJsZSddLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgSW5qZWN0YWJsZSkge1xyXG4gICAgdmFyIFBhcnRpYWxWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgICAgIF9fZXh0ZW5kcyhQYXJ0aWFsVmlld01vZGVsLCBfc3VwZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIFBhcnRpYWxWaWV3TW9kZWwoKSB7XHJcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUGFydGlhbFZpZXdNb2RlbDtcclxuICAgIH0pKEluamVjdGFibGUpO1xyXG4gICAgcmV0dXJuIFBhcnRpYWxWaWV3TW9kZWw7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYXJ0aWFsVmlld01vZGVsLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWdlL1BhcnRpYWxWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xyXG4gICAgdmFyIFZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFZhbGlkYXRpb24odmFsaWRhdGVkVmlld01vZGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkaXRpb25hbF9lcnJvcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnZhbGlkYXRlZFZpZXdNb2RlbC5pc1ZhbGlkKCkgJiYgX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy52YWxpZGF0ZWRWaWV3TW9kZWwoKS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIV90aGlzLnZhbGlkYXRlZFZpZXdNb2RlbCgpW2ZpZWxkXS5pc1ZhbGlkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBFbnVtZXJhYmxlLmZyb20oX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMpLmZpcnN0T3JEZWZhdWx0KGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmZpZWxkID09PSBmaWVsZDsgfSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFcnJvciA9IGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5hY3RpdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudmFsaWRhdGVkVmlld01vZGVsKCkuaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGVkVmlld01vZGVsKClbZmllbGRdKCk7IC8vIOWkieabtOOCkuaknOefpeOBmeOCi+OBn+OCgeOBq+WPgueFp+OBl+OBpuOBiuOBj1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy52YWxpZGF0ZWRWaWV3TW9kZWwoKVtmaWVsZF0uZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBFbnVtZXJhYmxlLmZyb20oX3RoaXMuYWRkaXRpb25hbF9lcnJvcnMpLmZpcnN0T3JEZWZhdWx0KGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmZpZWxkID09PSBmaWVsZDsgfSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWklumDqOOBp+aknOafu+OBl+OBn+e1kOaenOeZuueUn+OBl+OBn+OCqOODqeODvOOCkui/veWKoOioreWumuOBmeOCi1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZmllbGRcclxuICAgICAgICAgICAgICogQHBhcmFtIGVycm9yXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnNldEFkZGl0aW9uYWxFcnJvciA9IGZ1bmN0aW9uIChmaWVsZCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZGl0aW9uYWxfZXJyb3JzLnB1c2goeyBmaWVsZDogZmllbGQsIG1lc3NhZ2U6IGVycm9yIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aSW6YOo44Ko44Op44O844KS44Kv44Oq44KiXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQWRkaXRpb25hbEVycm9ycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZGl0aW9uYWxfZXJyb3JzID0gW107XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlZFZpZXdNb2RlbCA9IGtvLnZhbGlkYXRlZE9ic2VydmFibGUodmFsaWRhdGVkVmlld01vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFZhbGlkYXRpb247XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb247XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1WYWxpZGF0aW9uLmpzLm1hcFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYXJ0cy9WYWxpZGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBfX2V4dGVuZHMgPSB0aGlzLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xyXG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcclxufTtcclxuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi8uLi9Db21wb25lbnQnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIENvbXBvbmVudCkge1xyXG4gICAgdmFyIFBhZ2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgICAgICBfX2V4dGVuZHMoUGFnZXIsIF9zdXBlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gUGFnZXIoaXRlbXMsIHNpemUpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VJbnB1dCA9IDE7XHJcbiAgICAgICAgICAgIGtvLnRyYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICBrby5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncGFnZXMnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBNYXRoLmNlaWwoX3RoaXMuY291bnQgLyBfdGhpcy5zaXplKTsgfSk7XHJcbiAgICAgICAgICAgIGtvLmRlZmluZVByb3BlcnR5KHRoaXMsICdvZmZzZXQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiAoX3RoaXMucGFnZSAtIDEpICogX3RoaXMuc2l6ZTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFBhZ2VyLnByb3RvdHlwZS5nb1RvID0gZnVuY3Rpb24gKHBhZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2UgPCAxKVxyXG4gICAgICAgICAgICAgICAgcGFnZSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChwYWdlID4gdGhpcy5wYWdlcylcclxuICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2VzO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VJbnB1dCA9IHBhZ2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYWdlci5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29UbygxKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFBhZ2VyLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdvVG8odGhpcy5wYWdlIC0gMSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQYWdlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nb1RvKHRoaXMucGFnZSArIDEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUGFnZXIucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ubyh0aGlzLnBhZ2VzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFBhZ2VyLnByb3RvdHlwZS5pbnB1dHRlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nb1RvKHRoaXMucGFnZUlucHV0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBQYWdlcjtcclxuICAgIH0pKENvbXBvbmVudCk7XHJcbiAgICByZXF1aXJlKCcuL1BhZ2VyLmxlc3MnKTtcclxuICAgIENvbXBvbmVudC5yZWdpc3RlcigncGFnZXInLCBQYWdlciwgcmVxdWlyZSgnLi9QYWdlci5odG1sJykpO1xyXG4gICAgcmV0dXJuIFBhZ2VyO1xyXG59KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFnZXIuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL3BhZ2VyL1BhZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+XFxyXFxuXFx0XFx0PGgxIGNsYXNzPVxcXCJwYWdlLWhlYWRlclxcXCI+Q29udGFjdHM8L2gxPlxcclxcblxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmcgY2xlYXJmaXhcXFwiPlxcclxcblxcdFxcdFxcdFxcdDxwYWdlciBwYXJhbXM9XFxcIm9wdGlvbjogcGFnZXJcXFwiPjwvcGFnZXI+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1ob3ZlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRoZWFkPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8dGg+5pel5pmCPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8dGg+44GK5ZCN5YmNPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8dGg+44K/44Kk44OI44OrPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdFxcdFxcdDwvdGhlYWQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogbWVzc2FnZXNcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ciBzdHlsZT1cXFwiY3Vyc29yOiBwb2ludGVyO1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC5zaG93XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8dGQ+e3sgZGF0ZSB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHRkPnt7IG5hbWUgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDx0ZD57eyB0aXRsZSB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC90cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L3Rib2R5PlxcclxcblxcdFxcdFxcdFxcdDwvdGFibGU+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0PC9kaXY+XFxyXFxuXFx0PC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXFxyXFxuPHNjcmlwdCB0eXBlPVxcXCJ0ZXh0L2h0bWxcXFwiIGlkPVxcXCJtZXNzYWdlTW9kYWxCb2R5XFxcIj5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMlxcXCI+XFxyXFxuXFx0XFx0XFx0PHRhYmxlIGNsYXNzPVxcXCJ0YWJsZVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PHRyPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0aCBzdHlsZT1cXFwid2lkdGg6IDgwcHg7XFxcIj7ml6XmmYI8L3RoPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD57eyBkYXRlIH19PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+44GK5ZCN5YmNPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGQ+e3sgbmFtZSB9fTwvdGQ+XFxyXFxuXFx0XFx0XFx0XFx0PC90cj5cXHJcXG5cXHRcXHRcXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRoPuOCv+OCpOODiOODqzwvdGg+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRkPnt7IHRpdGxlIH19PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdFxcdDx0cj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+5pys5paHPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGQgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXFwiPnt7IGJvZHkgfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdDwvdHI+XFxyXFxuXFx0XFx0XFx0PC90YWJsZT5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG48L3NjcmlwdD5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFnZS9jb250YWN0L0NvbnRhY3RQYWdlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj5cXHJcXG5cXHRcXHQ8aDEgY2xhc3M9XFxcInBhZ2UtaGVhZGVyXFxcIj7jgqLjgqvjgqbjg7Pjg4joqK3lrpo8L2gxPlxcclxcblxcdDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuXFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTZcXFwiPlxcclxcblxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmcgY2xlYXJmaXhcXFwiPlxcclxcblxcdFxcdFxcdFxcdOODpuODvOOCtuioreWumlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiIGRhdGEtYmluZD1cXFwid2l0aDogcHJvZmlsZUVkaXRvclxcXCI+XFxyXFxuXFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxwPuODpuODvOOCtklEOiB7eyByZXNvdXJjZXMudXNlci5sb2dpbiB9fTwvcD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8cD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHTjgq/jg6rjgqLjg6njg7Pjgrk6IFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7I2lmIHJlc291cmNlcy51c2VyLmlzX21hc3Rlcn19XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWluZm9cXFwiPm1hc3Rlcjwvc3Bhbj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR7ey9pZn19XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0e3sjZWxzZX19XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0e3sjZm9yZWFjaDogcmVzb3VyY2VzLnVzZXIuY2xlYXJhbmNlc319XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLXN1Y2Nlc3NcXFwiPnt7ICRkYXRhIH19PC9zcGFuPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7L2ZvcmVhY2h9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7L2Vsc2V9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvcD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8bGFiZWwgZm9yPVxcXCJuYW1lXFxcIj7jg6bjg7zjgrblkI08L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwibmFtZVxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogcHJvZmlsZS5uYW1lXFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwiZW1haWxcXFwiPuODoeODvOODq+OCouODieODrOOCuTwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcImVtYWlsXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwiZW1haWxcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IHByb2ZpbGUuZW1haWxcXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBzYXZlLCBkaXNhYmxlOiBzYXZpbmdcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdOWkieabtHt7I2lmIHNhdmluZ319IDxpIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cXFwiPjwvaT4ge3svaWZ9fVxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvYnV0dG9uPlxcclxcblxcclxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdDwvZGl2PlxcclxcblxcclxcblxcdDxkaXYgY2xhc3M9XFxcImNvbC1sZy02XFxcIj5cXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nIGNsZWFyZml4XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHTjg5Hjgrnjg6/jg7zjg4nlpInmm7RcXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIiBkYXRhLWJpbmQ9XFxcIndpdGg6IHBhc3N3b3JkQ2hhbmdlclxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFxyXFxuXFx0XFx0XFx0XFx0PHA+XFxyXFxuXFx0XFx0XFx0XFx0XFx044OR44K544Ov44O844OJ44Gv5Y2K6KeSOOWtl+S7peS4iuOBp+OAgeWwj+aWh+Wtlywg5aSn5paH5a2XLCDmlbDlrZcsIOiomOWPt+OBruOBhuOBoeOBhOOBmuOCjOOBizLnqK7poZ7ku6XkuIrjga7mloflrZfjgpLkvb/jgYblv4XopoHjgYzjgYLjgorjgb7jgZnjgIJcXHJcXG5cXHRcXHRcXHRcXHQ8L3A+XFxyXFxuXFxyXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxsYWJlbD7nj77lnKjjga7jg5Hjgrnjg6/jg7zjg4k8L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogcGFzc3dvcmRcXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8bGFiZWw+5paw44GX44GE44OR44K544Ov44O844OJPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGRhdGEtYmluZD1cXFwidmFsdWU6IG5ld19wYXNzd29yZFxcXCIvPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxsYWJlbD7mlrDjgZfjgYTjg5Hjgrnjg6/jg7zjg4nvvIjnorroqo3jga7jgZ/jgoHjgoLjgYbkuIDluqblhaXlipvjgZfjgabjgY/jgaDjgZXjgYTvvIk8L2xhYmVsPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogcGFzc3dvcmRfY29uZmlybVxcXCIvPlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcclxcblxcclxcblxcdFxcdFxcdFxcdFxcdFxcdDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IGNoYW5nZSwgZGlzYWJsZTogc2F2aW5nXFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHTlpInmm7R7eyNpZiBzYXZpbmd9fSA8aSBjbGFzcz1cXFwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXFxcIj48L2k+IHt7L2lmfX1cXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2J1dHRvbj5cXHJcXG5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG48L2Rpdj5cIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFnZS9zZXR0aW5ncy9TZXR0aW5nc1BhZ2UuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTJcXFwiPlxcclxcblxcdFxcdFxcclxcblxcdFxcdDxoMSBjbGFzcz1cXFwicGFnZS1oZWFkZXJcXFwiPuODpuODvOOCtueuoeeQhjwvaDE+XFxyXFxuXFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZyBjbGVhcmZpeFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInB1bGwtcmlnaHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAge3sjaWYgbG9hZGluZ319IDxpIGNsYXNzPVxcXCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cXFwiPjwvaT4ge3svaWZ9fVxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBhZGRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS11c2VyXFxcIj48L2k+IOODpuODvOOCtui/veWKoFxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcblxcdFxcdFxcdDx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtaG92ZXJcXFwiPlxcclxcblxcdFxcdFxcdFxcdDx0aGVhZD5cXHJcXG5cXHRcXHRcXHRcXHQ8dHI+XFxyXFxuXFx0XFx0XFx0XFx0XFx0PHRoPklEPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+5ZCN5YmNPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+54q25oWLPC90aD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGg+566h55CGPC90aD5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdFxcdDwvdGhlYWQ+XFxyXFxuXFx0XFx0XFx0XFx0PHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogdXNlcnNcXFwiPlxcclxcblxcdFxcdFxcdFxcdDx0ciBkYXRhLWJpbmQ9XFxcImNsaWNrOiAkcGFyZW50LmVkaXRcXFwiIHN0eWxlPVxcXCJjdXJzb3I6IHBvaW50ZXI7XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGQ+e3sgbG9naW4gfX08L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD57eyBuYW1lIH19PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8dGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLWluZm9cXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogaXNfbWFzdGVyXFxcIj5tYXN0ZXI8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImxhYmVsIGxhYmVsLXN1Y2Nlc3NcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogZW5hYmxlZFxcXCI+5pyJ5Yq5PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJsYWJlbCBsYWJlbC1kZWZhdWx0XFxcIiBkYXRhLWJpbmQ9XFxcInZpc2libGU6ICFlbmFibGVkXFxcIj7lgZzmraLkuK08L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxcclxcblxcdFxcdFxcdFxcdFxcdDx0ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNpZiBpZCAhPT0gJHBhcmVudC5yZXNvdXJjZXMudXNlci5pZH19XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwIGJ0bi1ncm91cC14c1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogJHBhcmVudC50b2dnbGVFbmFibGVkLCBjbGlja0J1YmJsZTogZmFsc2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sjaWYgZW5hYmxlZH19IDxpIGNsYXNzPVxcXCJmYSBmYS1iYW5cXFwiPjwvaT4g5YGc5q2iIHt7L2lmfX1cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7I2Vsc2V9fSA8aSBjbGFzcz1cXFwiZmEgZmEtcmVjeWNsZVxcXCI+PC9pPiDmnInlirnljJYge3svZWxzZX19XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6ICRwYXJlbnQucmVtb3ZlLCBjbGlja0J1YmJsZTogZmFsc2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoXFxcIj48L2k+IOWJiumZpFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9pZn19XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAge3sjZWxzZX19XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAg44Ot44Kw44Kk44Oz5LitXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAge3svZWxzZX19XFxyXFxuXFx0XFx0XFx0XFx0XFx0PC90ZD5cXHJcXG5cXHRcXHRcXHRcXHQ8L3RyPlxcclxcblxcdFxcdFxcdFxcdDwvdGJvZHk+XFxyXFxuXFx0XFx0XFx0PC90YWJsZT5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHJcXG5cXHQ8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cXHRcXHRcXHRcXHRcXHJcXG48IS0tIOODpuODvOOCtui/veWKoOODgOOCpOOCouODreOCsOODhuODs+ODl+ODrOODvOODiCAtLT5cXHJcXG48c2NyaXB0IHR5cGU9XFxcInRleHQvaHRtbFxcXCIgaWQ9XFxcInVzZXJFZGl0b3JNb2RhbEJvZHlcXFwiPlxcclxcblxcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuXFx0XFx0e3sjaWYgZWRpdH19XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid2VsbCB3ZWxsLXNtXFxcIj7jg5Hjgrnjg6/jg7zjg4njgpLlpInmm7TjgZfjgarjgYTloLTlkIjjga/jg5Hjgrnjg6/jg7zjg4nmrITjgpLnqbrjgavjgZfjgabjgY/jgaDjgZXjgYTjgII8L2Rpdj5cXHJcXG5cXHRcXHR7ey9pZn19XFxyXFxuXFx0XFx0XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOnsgaGFzLWVycm9yOiB2YWxpZGF0aW9uLmhhc0Vycm9yKCdsb2dpbicpIH1cXFwiPlxcclxcblxcdFxcdFxcdFxcdDxsYWJlbCBmb3I9XFxcImxvZ2luXFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IG5lY2Vzc2FyeS1maWVsZDogIWVkaXQgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx044Om44O844K2SUQgPHNtYWxsPuWNiuinkuiLseaVsCzjgqLjg7Pjg4Djg7zjgrnjgrPjgqIoXyk8L3NtYWxsPlxcclxcblxcdFxcdFxcdFxcdDwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0XFx0PGlucHV0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIHR5cGU9XFxcInRleHRcXFwiIGlkPVxcXCJsb2dpblxcXCIgcGxhY2Vob2xkZXI9XFxcInVzZXJfaWRcXFwiIFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCB2YWx1ZT1cXFwie3sgdXNlci5sb2dpbiB9fVxcXCIgZGF0YS1iaW5kPVxcXCJkaXNhYmxlOiBlZGl0XFxcIiAvPlxcclxcblxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtZGFuZ2VyXFxcIj57eyB2YWxpZGF0aW9uLmdldEVycm9yKCdsb2dpbicpIH19PC9zcGFuPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIGRhdGEtYmluZD1cXFwiY3NzOnsgaGFzLWVycm9yOiB2YWxpZGF0aW9uLmhhc0Vycm9yKCduYW1lJykgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwibmFtZVxcXCIgY2xhc3M9XFxcIm5lY2Vzc2FyeS1maWVsZFxcXCI+5ZCN5YmNPC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgaWQ9XFxcIm5hbWVcXFwiIHZhbHVlPVxcXCJ7eyB1c2VyLm5hbWUgfX1cXFwiXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHBsYWNlaG9sZGVyPVxcXCJ7eyByZXNvdXJjZXMuY29uZmlnLmxhYmVsLnByb3ZpZGVyIH19XFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1kYW5nZXJcXFwiPnt7IHZhbGlkYXRpb24uZ2V0RXJyb3IoJ25hbWUnKSB9fTwvc3Bhbj5cXHJcXG5cXHRcXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHQ8L2Rpdj5cXHJcXG5cXHRcXHRcXHJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNlxcXCI+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsgaGFzLWVycm9yOiB2YWxpZGF0aW9uLmhhc0Vycm9yKCdwYXNzd29yZCcpIH1cXFwiPlxcclxcblxcdFxcdFxcdFxcdDxsYWJlbCBmb3I9XFxcInBhc3N3b3JkXFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IG5lY2Vzc2FyeS1maWVsZDogIWVkaXQgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0XFx044OR44K544Ov44O844OJIDxzbWFsbD7ljYrop5Loi7HmlbAs6KiY5Y+3IDjlrZfku6XkuIo8L3NtYWxsPlxcclxcblxcdFxcdFxcdFxcdDwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0XFx0PGlucHV0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBpZD1cXFwicGFzc3dvcmRcXFwiXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHZhbHVlPVxcXCJ7eyB1c2VyLnBhc3N3b3JkIH19XFxcIiBwbGFjZWhvbGRlcj1cXFwi4peP4peP4peP4peP4peP4peP4peP4pePXFxcIi8+XFxyXFxuXFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImhlbHAtYmxvY2sgdGV4dC1kYW5nZXJcXFwiPnt7IHZhbGlkYXRpb24uZ2V0RXJyb3IoJ3Bhc3N3b3JkJykgfX08L3NwYW4+XFxyXFxuXFx0XFx0XFx0PC9kaXY+XFxyXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6IHsgaGFzLWVycm9yOiB2YWxpZGF0aW9uLmhhc0Vycm9yKCdwYXNzd29yZF9jb25maXJtJykgfVxcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsIGZvcj1cXFwicGFzc3dvcmRfY29uZmlybVxcXCIgZGF0YS1iaW5kPVxcXCJjc3M6eyBuZWNlc3NhcnktZmllbGQ6ICFlZGl0IH1cXFwiPuODkeOCueODr+ODvOODie+8iOeiuuiqje+8iTwvbGFiZWw+XFxyXFxuXFx0XFx0XFx0XFx0PGlucHV0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBpZD1cXFwicGFzc3dvcmRfY29uZmlybVxcXCJcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgdmFsdWU9XFxcInt7IHBhc3N3b3JkX2NvbmZpcm0gfX1cXFwiIHBsYWNlaG9sZGVyPVxcXCLil4/il4/il4/il4/il4/il4/il4/il49cXFwiLz5cXHJcXG5cXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwiaGVscC1ibG9jayB0ZXh0LWRhbmdlclxcXCI+e3sgdmFsaWRhdGlvbi5nZXRFcnJvcigncGFzc3dvcmRfY29uZmlybScpIH19PC9zcGFuPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcclxcblxcdDwvZGl2PlxcclxcblxcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFx0XFx0XFxyXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyXFxcIj5cXHJcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBkYXRhLWJpbmQ9XFxcImNzczp7IGhhcy1lcnJvcjogdmFsaWRhdGlvbi5oYXNFcnJvcignZW1haWwnKSB9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHQ8bGFiZWwgZm9yPVxcXCJlbWFpbFxcXCI+44Oh44O844Or44Ki44OJ44Os44K5PC9sYWJlbD5cXHJcXG5cXHRcXHRcXHRcXHQ8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwiZW1haWxcXFwiIGlkPVxcXCJlbWFpbFxcXCIgZGF0YS1iaW5kPVxcXCJ2YWx1ZTogdXNlci5lbWFpbFxcXCIvPlxcclxcblxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJoZWxwLWJsb2NrIHRleHQtZGFuZ2VyXFxcIj57eyB2YWxpZGF0aW9uLmdldEVycm9yKCdlbWFpbCcpIH19PC9zcGFuPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcdDxoND7kvb/nlKjjgpLoqLHlj6/jgZnjgovmqZ/og708L2g0PlxcclxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgYnRuLWdyb3VwIGJ0bi1ncm91cC1zbVxcXCIgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBjbGVhcmFuY2Vfb3B0aW9uc1xcXCI+XFxyXFxuXFx0XFx0XFx0XFx0PGxhYmVsIGNsYXNzPVxcXCJidG5cXFwiIGRhdGEtYmluZD1cXFwiY3NzOntcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHQnYnRuLWRlZmF1bHQnOiAhJHBhcmVudC5oYXNDbGVhcmFuY2VPZihrZXkpLFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdCdidG4tcHJpbWFyeSBhY3RpdmUnOiAkcGFyZW50Lmhhc0NsZWFyYW5jZU9mKGtleSlcXHJcXG5cXHRcXHRcXHRcXHRcXHR9XFxcIj5cXHJcXG5cXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIHN0eWxlPVxcXCJkaXNwbGF5OiBub25lO1xcXCIgdmFsdWU9XFxcInt7IGtleSB9fVxcXCIgZGF0YS1iaW5kPVxcXCJjaGVja2VkOiAkcGFyZW50LnVzZXIuY2xlYXJhbmNlc1xcXCIvPnt7IG5hbWUgfX1cXHJcXG5cXHRcXHRcXHRcXHQ8L2xhYmVsPlxcclxcblxcdFxcdFxcdDwvZGl2PlxcclxcblxcdFxcdDwvZGl2PlxcclxcblxcdFxcdFxcclxcblxcdDwvZGl2Plxcclxcbjwvc2NyaXB0PlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWdlL3VzZXIvVXNlclBhZ2UuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhcnRzXFxcXHNpZGUtbmF2XFxcXFNpZGVOYXYubGVzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcc3R5bGUtbG9hZGVyXFxcXGFkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxcc2lkZS1uYXZcXFxcU2lkZU5hdi5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhcnRzXFxcXHNpZGUtbmF2XFxcXFNpZGVOYXYubGVzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvc2lkZS1uYXYvU2lkZU5hdi5sZXNzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGNzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyIS4vcGFydHMvc2lkZS1uYXYvU2lkZU5hdi5sZXNzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFnZVxcXFxob21lXFxcXEhvbWVQYWdlLmxlc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXHN0eWxlLWxvYWRlclxcXFxhZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhZ2VcXFxcaG9tZVxcXFxIb21lUGFnZS5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhZ2VcXFxcaG9tZVxcXFxIb21lUGFnZS5sZXNzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWdlL2hvbWUvSG9tZVBhZ2UubGVzc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxjc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9sZXNzLWxvYWRlciEuL3BhZ2UvaG9tZS9Ib21lUGFnZS5sZXNzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc0lFOSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgOVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU5LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc0lFOSgpO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KCkge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZVRleHQoc291cmNlLCBpZCwgcmVwbGFjZW1lbnQpIHtcclxuXHR2YXIgYm91bmRhcmllcyA9IFtcIi8qKiA+PlwiICsgaWQgKyBcIiAqKi9cIiwgXCIvKiogXCIgKyBpZCArIFwiPDwgKiovXCJdO1xyXG5cdHZhciBzdGFydCA9IHNvdXJjZS5sYXN0SW5kZXhPZihib3VuZGFyaWVzWzBdKTtcclxuXHR2YXIgd3JhcHBlZFJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnRcclxuXHRcdD8gKGJvdW5kYXJpZXNbMF0gKyByZXBsYWNlbWVudCArIGJvdW5kYXJpZXNbMV0pXHJcblx0XHQ6IFwiXCI7XHJcblx0aWYgKHNvdXJjZS5sYXN0SW5kZXhPZihib3VuZGFyaWVzWzBdKSA+PSAwKSB7XHJcblx0XHR2YXIgZW5kID0gc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMV0pICsgYm91bmRhcmllc1sxXS5sZW5ndGg7XHJcblx0XHRyZXR1cm4gc291cmNlLnNsaWNlKDAsIHN0YXJ0KSArIHdyYXBwZWRSZXBsYWNlbWVudCArIHNvdXJjZS5zbGljZShlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc291cmNlICsgd3JhcHBlZFJlcGxhY2VtZW50O1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0LCBpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHRcdGNzcyA9IFwiQGltcG9ydCB1cmwoXFxcImRhdGE6c3R5bGVzaGVldC9jc3M7YmFzZTY0LFwiICsgYnRvYShjc3MpICsgXCJcXFwiKVwiO1xyXG5cdFx0fSBjYXRjaChlKSB7fVxyXG5cdH1cclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhcnRzXFxcXHBhZ2VyXFxcXFBhZ2VyLmxlc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXHN0eWxlLWxvYWRlclxcXFxhZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxsZXNzLWxvYWRlclxcXFxpbmRleC5qcyFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXHBhcnRzXFxcXHBhZ2VyXFxcXFBhZ2VyLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISFDOlxcXFxVc2Vyc1xcXFxLZW50YVxcXFxQaHBzdG9ybVByb2plY3RzXFxcXGtvdHMtc3BhLWFkbWluLWV4YW1wbGVcXFxcYXBwXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGluZGV4LmpzIUM6XFxcXFVzZXJzXFxcXEtlbnRhXFxcXFBocHN0b3JtUHJvamVjdHNcXFxca290cy1zcGEtYWRtaW4tZXhhbXBsZVxcXFxhcHBcXFxccGFydHNcXFxccGFnZXJcXFxcUGFnZXIubGVzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFydHMvcGFnZXIvUGFnZXIubGVzc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcS2VudGFcXFxcUGhwc3Rvcm1Qcm9qZWN0c1xcXFxrb3RzLXNwYS1hZG1pbi1leGFtcGxlXFxcXGFwcFxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxjc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwidWwua28tcGFnZXIge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xcbn1cXG51bC5rby1wYWdlciA+IGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG59XFxudWwua28tcGFnZXIgPiBsaS5wYWdlci1pbnB1dCB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBtYXJnaW46IDRweCAwO1xcbiAgY29sb3I6ICM3Nzc7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjYWFhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAwIDJweDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG51bC5rby1wYWdlciA+IGxpLnBhZ2VyLWlucHV0IGlucHV0IHtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDAgMnB4O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG51bC5rby1wYWdlciA+IGxpLnBhZ2VyLXN1bW1hcnkge1xcbiAgY29sb3I6ICM4ODg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcbnVsLmtvLXBhZ2VyID4gbGkuYnRuIHtcXG4gIG1hcmdpbi10b3A6IC0ycHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogIzQyOGJjYTtcXG59XFxudWwua28tcGFnZXIgPiBsaS5idG4gPiBpIHtcXG4gIG1hcmdpbjogMCAxcHg7XFxufVxcbnVsLmtvLXBhZ2VyID4gbGkuYnRuOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxufVxcblwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vbGVzcy1sb2FkZXIhLi9wYXJ0cy9wYWdlci9QYWdlci5sZXNzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8dWwgY2xhc3M9XFxcImtvLXBhZ2VyXFxcIj5cXHJcXG5cXHQ8bGkgY2xhc3M9XFxcInBhZ2VyLXN1bW1hcnlcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogIWxvYWRpbmdcXFwiPlxcclxcblxcdFxcdDxzcGFuIGNsYXNzPVxcXCJoaWRkZW4teHNcXFwiPlxcclxcblxcdFxcdFxcdDwhLS1rbyBpZjogY291bnQgPiAwIC0tPlxcclxcblxcdFxcdFxcdDxzcGFuIGRhdGEtYmluZD1cXFwidGV4dDogY291bnRcXFwiPiA8L3NwYW4+IOS7tuS4rVxcclxcblxcdFxcdFxcdDxzcGFuIGRhdGEtYmluZD1cXFwidGV4dDogb2Zmc2V0ICsgMVxcXCI+IDwvc3Bhbj4gLVxcclxcblxcdFxcdFxcdDxzcGFuIGRhdGEtYmluZD1cXFwidGV4dDogb2Zmc2V0ICsgaXRlbXMubGVuZ3RoXFxcIj4gPC9zcGFuPiDku7bnm67jgpLooajnpLrkuK1cXHJcXG5cXHRcXHRcXHQ8IS0tL2tvLS0+XFxyXFxuXFx0XFx0XFx0PCEtLWtvIGVsc2UtLT5cXHJcXG5cXHRcXHRcXHTjgqLjgqTjg4bjg6DjgYznmbvpjLLjgZXjgozjgabjgYTjgb7jgZvjgpNcXHJcXG5cXHRcXHRcXHQ8IS0tL2tvLS0+XFxyXFxuXFx0XFx0PC9zcGFuPlxcclxcblxcdDwvbGk+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJpbmRpY2F0b3JcXFwiIGRhdGEtYmluZD1cXFwidmlzaWJsZTogbG9hZGluZ1xcXCI+XFxyXFxuXFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXJlZnJlc2ggZmEtc3BpblxcXCI+PC9pPlxcclxcblxcdDwvbGk+XFxyXFxuXFx0PGxpIGNsYXNzPVxcXCJidG4gYnRuLXhzXFxcIiBkYXRhLWJpbmQ9XFxcImNsaWNrOiBmaXJzdFxcXCI+XFxyXFxuXFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXN0ZXAtYmFja3dhcmRcXFwiPjwvaT5cXHJcXG5cXHQ8L2xpPlxcclxcblxcdDxsaSBjbGFzcz1cXFwiYnRuIGJ0bi14c1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogcHJldlxcXCI+XFxyXFxuXFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLWNhcmV0LWxlZnRcXFwiPjwvaT5cXHJcXG5cXHQ8L2xpPlxcclxcblxcdDxsaSBjbGFzcz1cXFwicGFnZXItaW5wdXRcXFwiIG9uY2xpY2s9XFxcIiQodGhpcykuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xcXCI+XFxyXFxuXFx0XFx0PGZvcm0gZGF0YS1iaW5kPVxcXCJzdWJtaXQ6IGdvVG9JbnB1dHRlZFxcXCI+XFxyXFxuXFx0XFx0XFx0PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG9uZm9jdXM9XFxcInRoaXMuc2VsZWN0KCk7XFxcIlxcclxcblxcdFxcdFxcdFxcdFxcdFxcdCBkYXRhLWJpbmQ9XFxcInZhbHVlOiBwYWdlSW5wdXQsXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0dmFsdWVVcGRhdGU6ICdhZnRlcmtleWRvd24nXFxcIiAvPlxcclxcblxcdFxcdFxcdC88c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IHBhZ2VzXFxcIj4gPC9zcGFuPlxcclxcblxcdFxcdDwvZm9ybT5cXHJcXG5cXHQ8L2xpPlxcclxcblxcdDxsaSBjbGFzcz1cXFwiYnRuIGJ0bi14c1xcXCIgZGF0YS1iaW5kPVxcXCJjbGljazogbmV4dFxcXCI+XFxyXFxuXFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLWNhcmV0LXJpZ2h0XFxcIj48L2k+XFxyXFxuXFx0PC9saT5cXHJcXG5cXHQ8bGkgY2xhc3M9XFxcImJ0biBidG4teHNcXFwiIGRhdGEtYmluZD1cXFwiY2xpY2s6IGxhc3RcXFwiPlxcclxcblxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS1zdGVwLWZvcndhcmRcXFwiPjwvaT5cXHJcXG5cXHQ8L2xpPlxcclxcbjwvdWw+XFxyXFxuXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3BhcnRzL3BhZ2VyL1BhZ2VyLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiLi4vcHVibGljL2pzL2J1bmRsZS5qcyJ9