var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../Component'], function (require, exports, Component) {
    var HeaderNav = (function (_super) {
        __extends(HeaderNav, _super);
        function HeaderNav() {
            _super.call(this);
            ko.track(this);
        }
        return HeaderNav;
    })(Component);
    Component.register('header-nav', HeaderNav, require('./HeaderNav.html'));
    return HeaderNav;
});
//# sourceMappingURL=HeaderNav.js.map