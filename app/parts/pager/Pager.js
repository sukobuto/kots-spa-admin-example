var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../Component'], function (require, exports, Component) {
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
    require('./Pager.less');
    Component.register('pager', Pager, require('./Pager.html'));
    return Pager;
});
//# sourceMappingURL=Pager.js.map