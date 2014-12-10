define(["require", "exports"], function (require, exports) {
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
});
//# sourceMappingURL=ApiBase.js.map