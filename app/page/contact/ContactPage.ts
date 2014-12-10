/// <reference path="../../references.d.ts" />
import Page = require('../Page');
import Pager = require('../../parts/pager/Pager');
export = ContactPage;

var componentId = 'contact-page';

class ContactPage extends Page {

	public static instance : Page = null;
	public static factory() {
		if (this.instance != null) return this.instance;
		return this.instance = new ContactPage();
	}

	public title = "Contact";
	public messages:Message[] = [];
	public pager:Pager;

	constructor() {
		super();
		this.componentId = componentId;
		ko.track(this);
		this.pager = new Pager(ko.getObservable(this, 'messages'), 10);
	}
	
	public load(context) {
		ko.computed(this.reload);
	}
	
	public reload = () => {
		this.pager.loading = true;
		this.api.getMessages(this.pager.offset, this.pager.size)
			.then((res) => {
				this.pager.count = res.count;
				this.messages = res.messages;
			})
			.always(() => { this.pager.loading = false });
	};
	
	public show = (message:Message):void => {
		this.modal
			.setHeader('メッセージ')
			.setCustomBody('messageModalBody', message)
			.setFooter(null, '', '閉じる')
			.show();
	};
	
}

Page.register(componentId, ContactPage, require('./ContactPage.html'));

interface Message {
	date:string;
	name:string;
	title:string;
	body:string;
}