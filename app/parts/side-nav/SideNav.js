var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../Component'], function (require, exports, Component) {
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
    require('./SideNav.less');
    Component.register('side-nav', SideNav, require('./SideNav.html'));
    return SideNav;
});
//# sourceMappingURL=SideNav.js.map