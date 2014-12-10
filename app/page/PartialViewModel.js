var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../di/DependencyInjectable'], function (require, exports, Injectable) {
    var PartialViewModel = (function (_super) {
        __extends(PartialViewModel, _super);
        function PartialViewModel() {
            _super.apply(this, arguments);
        }
        return PartialViewModel;
    })(Injectable);
    return PartialViewModel;
});
//# sourceMappingURL=PartialViewModel.js.map