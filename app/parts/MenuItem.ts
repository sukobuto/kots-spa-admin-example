/// <reference path="../references.d.ts" />
import Page = require('../page/Page');
export = MenuItem;

class MenuItem{
	constructor(
		public name : string,
		public path : string,
		public label : string,
		public icon : string)
	{
		ko.track(this);
	}
}
