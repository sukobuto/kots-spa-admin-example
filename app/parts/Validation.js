define(["require", "exports"], function (require, exports) {
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
});
//# sourceMappingURL=Validation.js.map