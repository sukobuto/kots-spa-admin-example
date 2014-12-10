/// <reference path="../../references.d.ts" />
import Component = require('../../Component');
import MenuItem = require('../MenuItem');
export = SideNav;

class SideNav extends Component {
	public isShown = true;
	constructor(public menu:MenuItem[]){
		super();
		ko.track(this);
	}

	public toggle(){
		this.isShown = !this.isShown;
	}
}

require('./SideNav.less');
Component.register('side-nav', SideNav, require('./SideNav.html'));
