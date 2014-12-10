/// <reference path="../../references.d.ts" />
import Component = require('../../Component');
export = HeaderNav;

class HeaderNav extends Component {
	
	constructor(){
		super();
		ko.track(this); 
	}
}

Component.register('header-nav', HeaderNav, require('./HeaderNav.html'));
