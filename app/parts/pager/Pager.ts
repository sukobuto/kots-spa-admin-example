/// <reference path="../../references.d.ts" />
import Component = require('../../Component');
export = Pager;

class Pager extends Component {
	
	public loading = false;
	public count = 0;
	public page = 1;
	public pageInput = 1;
	public pages : number;
	public offset : number;
	
	constructor(public items : KnockoutObservable<any>, public size : number) {
		super();
		ko.track(this);
		ko.defineProperty(this, 'pages', () => Math.ceil(this.count / this.size));
		ko.defineProperty(this, 'offset', () => (this.page - 1) * this.size);
	}
	
	public goTo(page) {
		if (page < 1) page = 1;
		if (page > this.pages) page = this.pages;
		this.page = page;
		this.pageInput = page;
	}
	
	public first() {
		this.goTo(1)
	}
	
	public prev() {
		this.goTo(this.page - 1)
	}
	
	public next() {
		this.goTo(this.page + 1)
	}
	
	public last() {
		this.goTo(this.pages)
	}
	
	public inputted() {
		this.goTo(this.pageInput)
	}
}

require('./Pager.less');
Component.register('pager', Pager, require('./Pager.html'));