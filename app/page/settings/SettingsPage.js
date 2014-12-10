var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../Page', '../PartialViewModel'], function (require, exports, Page, PartialViewModel) {
    var componentId = "settings-page";
    var SettingsPage = (function (_super) {
        __extends(SettingsPage, _super);
        function SettingsPage() {
            _super.call(this);
            this.profileEditor = new ProfileEditor();
            this.passwordChanger = new PasswordChanger();
            this.componentId = componentId;
            ko.track(this);
        }
        SettingsPage.factory = function () {
            if (this.instance != null)
                return this.instance;
            return this.instance = new SettingsPage();
        };
        SettingsPage.prototype.load = function (context) {
            this.profileEditor.reset();
            this.passwordChanger.reset();
        };
        SettingsPage.instance = null;
        return SettingsPage;
    })(Page);
    Page.register(componentId, SettingsPage, require('./SettingsPage.html'));
    var ProfileEditor = (function (_super) {
        __extends(ProfileEditor, _super);
        function ProfileEditor() {
            _super.call(this);
            this.saving = false;
            this.reset();
            ko.track(this);
        }
        ProfileEditor.prototype.save = function () {
            var _this = this;
            this.saving = true;
            this.api.successDummy().then(function (res) {
                if (res.error)
                    _this.toaster.danger("失敗", res.error);
                if (res.success)
                    _this.toaster.success("完了", "プロファイルを更新しました");
                _this.apply();
            }).always(function () {
                _this.saving = false;
            });
        };
        ProfileEditor.prototype.reset = function () {
            this.profile = {
                name: this.resources.user.name,
                email: this.resources.user.email
            };
        };
        ProfileEditor.prototype.apply = function () {
            this.resources.user.name = this.profile.name;
            this.resources.user.email = this.profile.email;
        };
        return ProfileEditor;
    })(PartialViewModel);
    var PasswordChanger = (function (_super) {
        __extends(PasswordChanger, _super);
        function PasswordChanger() {
            _super.call(this);
            this.saving = false;
            this.password = "";
            this.new_password = "";
            this.password_confirm = "";
            ko.track(this);
        }
        PasswordChanger.prototype.change = function () {
            var _this = this;
            if (this.new_password !== this.password_confirm) {
                this.toaster.warning("エラー", "確認パスワードが一致しません");
                return;
            }
            this.saving = true;
            this.api.successDummy().then(function (res) {
                if (res.error)
                    _this.toaster.danger("失敗", res.error);
                if (res.success)
                    _this.toaster.success("完了", "パスワードを変更しました");
                _this.reset();
            }).always(function () {
                _this.saving = false;
            });
        };
        PasswordChanger.prototype.reset = function () {
            this.password = "";
            this.new_password = "";
            this.password_confirm = "";
        };
        return PasswordChanger;
    })(PartialViewModel);
    return SettingsPage;
});
//# sourceMappingURL=SettingsPage.js.map