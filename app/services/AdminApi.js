var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './ApiBase'], function (require, exports, ApiBase) {
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
});
//# sourceMappingURL=AdminApi.js.map