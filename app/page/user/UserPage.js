var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Page', '../PartialViewModel', '../../parts/Validation'], function (require, exports, Page, PartialViewModel, Validation) {
    var componentId = 'user-page';
    var UserPage = (function (_super) {
        __extends(UserPage, _super);
        function UserPage() {
            var _this = this;
            _super.call(this);
            this.loading = false;
            this.users = [];
            this.edit = function (user) {
                var editor = new UserEditor(user);
                var exec = function () {
                    editor.validation.active = true;
                    if (!editor.validation.isValid())
                        return;
                    _this.modal.actionSuspended = true;
                    _this.api.successDummy().then(function (res) {
                        if (res.error)
                            _this.toaster.danger('エラー', res.error);
                        if (res.success) {
                            _this.toaster.success('完了', 'ユーザ情報を更新しました');
                            _this.modal.close();
                            _this.reload();
                        }
                    }).always(function () {
                        _this.modal.actionSuspended = false;
                    });
                };
                _this.modal.setHeader('ユーザ編集').setCustomBody('userEditorModalBody', editor).setFooter(exec, '保存', 'キャンセル').show();
            };
            this.toggleEnabled = function (user) {
                _this.loading = true;
                user.enabled = !user.enabled;
                _this.api.successDummy().then(function (res) {
                    if (res.error)
                        _this.toaster.error(res.error);
                    _this.reload();
                });
            };
            this.remove = function (user) {
                var exec = function () {
                    _this.modal.actionSuspended = true;
                    _this.api.successDummy().then(function (res) {
                        if (res.error)
                            _this.toaster.error(res.error);
                        else {
                            _this.reload();
                            _this.modal.close();
                        }
                    }).always(function () {
                        _this.modal.actionSuspended = false;
                    });
                };
                _this.modal.setHeader('ユーザ削除').setBody(user.name + ' (id:' + user.login + ') を削除します。<br>本当によろしいですか？').setFooter(exec, 'はい', 'いいえ').show();
            };
            this.componentId = componentId;
            ko.track(this);
        }
        UserPage.factory = function () {
            if (this.instance != null)
                return this.instance;
            return this.instance = new UserPage();
        };
        UserPage.prototype.load = function (context) {
            this.reload();
        };
        UserPage.prototype.reload = function () {
            var _this = this;
            this.loading = true;
            this.api.getUsers().then(function (res) {
                _this.users = res.users;
            }).always(function () {
                _this.loading = false;
            });
        };
        UserPage.prototype.add = function () {
            var _this = this;
            var editor = new UserEditor();
            var exec = function () {
                editor.validation.active = true;
                if (!editor.validation.isValid())
                    return;
                _this.modal.actionSuspended = true;
                _this.api.successDummy().then(function (res) {
                    if (res.error)
                        _this.toaster.danger('エラー', res.error);
                    if (res.success) {
                        _this.toaster.success('完了', 'ユーザを追加しました');
                        _this.modal.close();
                        _this.reload();
                    }
                }).always(function () {
                    _this.modal.actionSuspended = false;
                });
            };
            this.modal.setHeader('ユーザ追加').setCustomBody('userEditorModalBody', editor).setFooter(exec, '追加', 'キャンセル').show();
        };
        UserPage.instance = null;
        return UserPage;
    })(Page);
    var UserEditor = (function (_super) {
        __extends(UserEditor, _super);
        function UserEditor(user) {
            _super.call(this);
            this.saving = false;
            this.edit = false;
            this.password_confirm = "";
            this.validation = null;
            this.clearance_options = [
                { key: 'contact', name: '問い合わせ' },
                { key: 'member', name: '会員管理' },
            ];
            this.edit = user ? true : false;
            this.user = ko.utils.extend({
                id: 0,
                login: '',
                password: '',
                name: '',
                email: '',
                enabled: true,
                clearances: []
            }, user ? user : {});
            ko.track(this.user);
            ko.track(this);
            var user = this.user;
            this.validation = new Validation({
                login: ko.getObservable(user, 'login').extend({
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    pattern: {
                        message: '無効なユーザIDです',
                        params: '^[a-zA-Z0-9_]+$'
                    }
                }),
                password: ko.getObservable(user, 'password').extend({
                    required: !this.edit,
                    minLength: 8,
                    maxLength: 64
                }),
                password_confirm: ko.getObservable(this, 'password_confirm').extend({
                    required: !this.edit,
                    equal: {
                        params: ko.getObservable(user, 'password'),
                        message: 'パスワードが一致しません'
                    }
                }),
                name: ko.getObservable(user, 'name').extend({
                    required: true,
                    maxLength: 20
                }),
                email: ko.getObservable(user, 'email').extend({
                    email: true,
                    maxLength: 255
                })
            });
        }
        UserEditor.prototype.hasClearanceOf = function (identifier) {
            return this.user.clearances.indexOf(identifier) >= 0;
        };
        UserEditor.prototype.getData = function () {
            return this.user;
        };
        return UserEditor;
    })(PartialViewModel);
    Page.register(componentId, UserPage, require('./UserPage.html'));
    return UserPage;
});
//# sourceMappingURL=UserPage.js.map