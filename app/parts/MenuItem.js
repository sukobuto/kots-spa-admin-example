define(["require", "exports"], function (require, exports) {
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
});
//# sourceMappingURL=MenuItem.js.map