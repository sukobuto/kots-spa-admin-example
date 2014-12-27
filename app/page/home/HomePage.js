var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Page'], function (require, exports, Page) {
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
    require('./HomePage.less');
    Page.register(componentId, HomePage, require('./HomePage.html'));
    return HomePage;
});
//# sourceMappingURL=HomePage.js.map