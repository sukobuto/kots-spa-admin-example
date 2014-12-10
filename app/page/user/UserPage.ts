/// <reference path="../../references.d.ts" />
import Page = require('../Page');
import PartialViewModel = require('../PartialViewModel');
import Validation = require('../../parts/Validation');
export = UserPage;

var componentId = 'user-page';

class UserPage extends Page {

	public static instance : Page = null;
	public static factory() {
		if (this.instance != null) return this.instance;
		return this.instance = new UserPage();
	}
	
	public loading = false;
	public users : Administrator[] = [];
	
	constructor() {
		super();
		this.componentId = componentId;
		ko.track(this);
	}
	
	public load(context) {
		this.reload();
	}
	
	private reload() {
		this.loading = true;
		this.api.getUsers()
			.then((res) => {
				this.users = res.users;
			})
			.always(() => { this.loading = false });
	}
	
	public edit = (user : Administrator) => {
		var editor = new UserEditor(user);
		var exec = () => {
			editor.validation.active = true;
			if (!editor.validation.isValid()) return;
			this.modal.actionSuspended = true;
			this.api.successDummy()
				.then((res) => {
					if (res.error) this.toaster.danger('エラー', res.error);
					if (res.success) {
						this.toaster.success('完了', 'ユーザ情報を更新しました');
						this.modal.close();
						this.reload();
					}
				})
				.always(() => { this.modal.actionSuspended = false });
		};
		this.modal
			.setHeader('ユーザ編集')
			.setCustomBody('userEditorModalBody', editor)
			.setFooter(exec, '保存', 'キャンセル')
			.show();
	};
	
	public add() {
		var editor = new UserEditor();
		var exec = () => {
			editor.validation.active = true;
			if (!editor.validation.isValid()) return;
			this.modal.actionSuspended = true;
			this.api.successDummy()
				.then((res) => {
					if (res.error) this.toaster.danger('エラー', res.error);
					if (res.success) {
						this.toaster.success('完了', 'ユーザを追加しました');
						this.modal.close();
						this.reload();
					}
				})
				.always(() => { this.modal.actionSuspended = false });
		};
		this.modal
			.setHeader('ユーザ追加')
			.setCustomBody('userEditorModalBody', editor)
			.setFooter(exec, '追加', 'キャンセル')
			.show();
	}
	
	public toggleEnabled = (user : Administrator) => {
		this.loading = true;
		user.enabled = !user.enabled;
		this.api.successDummy()
			.then((res) => {
				if (res.error) this.toaster.error(res.error);
				this.reload();
			});
	};
	
	public remove = (user) => {
		var exec = () => {
			this.modal.actionSuspended = true;
			this.api.successDummy()
				.then((res) => {
					if (res.error) this.toaster.error(res.error);
					else {
						this.reload();
						this.modal.close();
					}
				})
				.always(() => { this.modal.actionSuspended = false });
		};
		this.modal
			.setHeader('ユーザ削除')
			.setBody(user.name + ' (id:' + user.login + ') を削除します。<br>本当によろしいですか？')
			.setFooter(exec, 'はい', 'いいえ')
			.show();
	}
	
}

class UserEditor extends PartialViewModel {

	public saving = false;
	public edit = false;
	public user: Administrator;
	public password_confirm: string = "";
	public validation:Validation = null;
	
	public clearance_options = [
		{ key: 'contact', name: '問い合わせ' },
		{ key: 'member', name: '会員管理' },
	];
	
	public hasClearanceOf(identifier: string) {
		return this.user.clearances.indexOf(identifier) >= 0;
	}
	
	constructor(user?: Administrator) {
		super();
		this.edit = user ? true : false;
		this.user = <Administrator>ko.utils.extend({
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
	
	public getData() : Administrator {
		return this.user;
	}
	
}

Page.register(componentId, UserPage, require('./UserPage.html'));
