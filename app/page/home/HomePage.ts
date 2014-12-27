/// <reference path="../../references.d.ts" />
import Page = require('../Page');
export = HomePage;

var componentId = 'home-page';

class HomePage extends Page {
	
	public static instance : Page = null;
	public static factory() {
		if (this.instance != null) return this.instance;
		return this.instance = new HomePage();
	}
	
	public title = "KO + TypeScript で大規模 SPA 開発";
	
	constructor() {
		super();
		this.componentId = componentId;
		ko.track(this);
	}
}

require('./HomePage.less');
Page.register(componentId, HomePage, require('./HomePage.html'));
