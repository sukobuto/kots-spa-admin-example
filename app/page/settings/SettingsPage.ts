/// <reference path="../../references.d.ts" />
import Page = require('../Page');
import PartialViewModel = require('../PartialViewModel');
import Validation = require('../../parts/Validation');
export = SettingsPage;

var componentId = "settings-page";

class SettingsPage extends Page {

	public static instance : Page = null;
	public static factory() {
		if (this.instance != null) return this.instance;
		return this.instance = new SettingsPage();
	}

	public profileEditor = new ProfileEditor();
	public passwordChanger = new PasswordChanger();

	constructor() {
		super();
		this.componentId = componentId;
		ko.track(this);
	}
	
	public load(context) {
		this.profileEditor.reset();
		this.passwordChanger.reset();
	}
}

Page.register(componentId, SettingsPage, require('./SettingsPage.html'));

class ProfileEditor extends PartialViewModel {
	
	public saving = false;
	public profile:any;

	constructor() {
		super();
		this.reset();
		ko.track(this);
		
	}
	
	public save() {
		this.saving = true;
		this.api.successDummy()
			.then((res) => {
				if (res.error) this.toaster.danger("失敗", res.error);
				if (res.success) this.toaster.success("完了", "プロファイルを更新しました");
				this.apply();
			})
			.always(() => { this.saving = false })
	}
	
	public reset() {
		this.profile = {
			name: this.resources.user.name,
			email: this.resources.user.email
		}
	}
	
	public apply() {
		this.resources.user.name = this.profile.name;
		this.resources.user.email = this.profile.email;
	}
	
}

class PasswordChanger extends PartialViewModel  {
	
	public saving = false;
	public password = "";
	public new_password = "";
	public password_confirm = "";

	constructor() {
		super();
		ko.track(this);
	}
	
	public change() {
		if (this.new_password !== this.password_confirm) {
			this.toaster.warning("エラー", "確認パスワードが一致しません");
			return;
		}
		this.saving = true;
		this.api.successDummy()
			.then((res) => {
				if (res.error) this.toaster.danger("失敗", res.error);
				if (res.success) this.toaster.success("完了", "パスワードを変更しました");
				this.reset();
			})
			.always(() => { this.saving = false; });
	}
	
	public reset() {
		this.password = "";
		this.new_password = "";
		this.password_confirm = "";
	}
	
}
