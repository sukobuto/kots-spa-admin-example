var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Component'], function (require, exports, Component) {
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
});
//# sourceMappingURL=Page.js.map