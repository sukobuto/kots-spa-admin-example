var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../Component'], function (require, exports, Component) {
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal() {
            _super.call(this);
            this.size = null;
            this.header = null;
            this.body = null;
            this.footer = null;
            this.actionSuspended = false;
            ko.track(this);
            this.shown = ko.observable(false);
            this.shown.subscribe(function (shown) {
                if (!shown) {
                    this.size = null;
                    this.header = null;
                    this.body = null;
                    this.footer = null;
                }
            });
        }
        /**
         * モーダルダイアログの横幅サイズを変更
         * @param size 'large' または 'small'
         * @returns {Modal}
         */
        Modal.prototype.setSize = function (size) {
            this.size = size;
            return this;
        };
        /**
         * @param template テンプレートID
         * @param data バインドするデータコンテキストまたは ViewModel
         * @returns {Modal}
         */
        Modal.prototype.setCustomHeader = function (template, data) {
            this.header = { name: template, data: data };
            return this;
        };
        /**
         * @param template テンプレートID
         * @param data バインドするデータコンテキストまたは ViewModel
         * @returns {Modal}
         */
        Modal.prototype.setCustomBody = function (template, data) {
            this.body = { name: template, data: data };
            return this;
        };
        /**
         * @param template テンプレートID
         * @param data バインドするデータコンテキストまたは ViewModel
         * @returns {Modal}
         */
        Modal.prototype.setCustomFooter = function (template, data) {
            this.footer = { name: template, data: data };
            return this;
        };
        Modal.prototype.setHeader = function (label) {
            return this.setCustomHeader('modalHeader', { label: label });
        };
        Modal.prototype.setBody = function (content) {
            return this.setCustomBody('modalBody', { content: content });
        };
        Modal.prototype.setFooter = function (action, primaryLabel, closeLabel) {
            var data = {
                action: action,
                primaryLabel: primaryLabel,
                closeLabel: closeLabel,
                hasError: false
            };
            ko.track(data);
            return this.setCustomFooter('modalFooter', data);
        };
        Modal.prototype.show = function (arg1, arg2, arg3, arg4, arg5) {
            if (arg1 != null) {
                this.setHeader(arg1);
                this.setBody(arg2);
                if (typeof arg3 == 'function') {
                    this.setFooter(arg3, arg4 || 'OK', arg5 || 'Cancel');
                }
                else {
                    this.setFooter(null, '', arg3 || 'OK');
                }
            }
            this.shown(true);
            return this;
        };
        Modal.prototype.close = function () {
            this.shown(false);
            return this;
        };
        return Modal;
    })(Component);
    Component.register('modal', Modal, require('./Modal.html'));
    return Modal;
});
//# sourceMappingURL=Modal.js.map