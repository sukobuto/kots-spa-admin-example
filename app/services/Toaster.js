define(["require", "exports"], function (require, exports) {
    var Toaster = (function () {
        function Toaster() {
        }
        Toaster.prototype.success = function (title, message) {
            this.toast('success', title, message);
        };
        Toaster.prototype.info = function (title, message) {
            this.toast('info', title, message);
        };
        Toaster.prototype.warning = function (title, message) {
            this.toast('warning', title, message);
        };
        Toaster.prototype.danger = function (title, message) {
            this.toast('danger', title, message);
        };
        Toaster.prototype.error = function (message) {
            this.danger('エラー', message);
        };
        Toaster.prototype.toast = function (priority, title, message) {
            $.toaster({
                priority: priority,
                title: title,
                message: message
            });
        };
        return Toaster;
    })();
    return Toaster;
});
//# sourceMappingURL=Toaster.js.map