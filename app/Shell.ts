/// <reference path="references.d.ts" />
import Injectable = require('di/DependencyInjectable');
import Page = require('page/Page');

import SideNav = require('parts/side-nav/SideNav');
import HeaderNav = require('parts/header-nav/HeaderNav');
import MenuItem = require('parts/MenuItem');
export = Shell;

interface Route {
	name : string;
	page : () => Page;
	nav? : NavSetting;
	path : string;
	handler : (any?) => void;
}

interface NavSetting {
	label : string;
	icon : string;
}

class Shell extends Injectable {
	
	public sideNav : SideNav = null;
	public headerNav : HeaderNav;
	public routeMap : any = null;
	public page : Page = null;
	public menuId : string = null;
	public modal = this.modal;

	constructor(){
		super();
		ko.track(this);
	}
	
	public initialize() : Shell {
		var routes = this.declareRoutes();
		this.routeMap = Enumerable.from(routes)
			.toObject(r => r.name, r => r);
		this.sideNav = new SideNav(
			Enumerable.from(routes)
				.where(r => r.nav != null && this.userHasClearanceOf(r.name))
				.select(r => new MenuItem(r.name, r.path, r.nav.label, r.nav.icon))
				.toArray()
		);
		routie(
			<{ [x: string]: Function; }>Enumerable.from(routes)
				.where(r => r.nav == null || this.userHasClearanceOf(r.name))
				.toObject(r => r.path, r => r.handler)
		);
		this.headerNav = new HeaderNav();
		return this;
	}
	
	private userHasClearanceOf(identifier : string) : boolean {
		if (identifier === 'home') return true;	// home は無条件で許可
		if (this.resources.user.is_master) return true;
		return this.resources.user.clearances.indexOf(identifier) >= 0;
	}
	
	public load() {
		var fixSize = () => {
			var topOffset = 50;
			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
			if (width < 768) {
				$('div.navbar-collapse').addClass('collapse');
				topOffset = 100; // 2-row-menu
			} else {
				$('div.navbar-collapse').removeClass('collapse');
			}

			var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
			height = height - topOffset;
			if (height < 1) height = 1;
			if (height > topOffset) {
				$("#page-wrapper").css("min-height", (height) + "px");
			}
		};
		fixSize();
		$(window).on('resize', fixSize);
		routie(window.location.hash);
	}

	public transit(name : string, context : any) : void {
		this.page = this.routeMap[name].page();
		this.page.load(context);
		this.menuId = name;
		setTimeout(() => {
			$('#page-wrapper > .row').addClass('active');
		}, 100);
	}
	
	private declareRoutes() : Route[] {
		return [
			{
				name: 'home', page: require('page/home/HomePage').factory,
				nav: { label: 'Home', icon: 'folder' },
				path: '', handler: () => this.transit('home', {})
			},
			{
				name: 'settings', page: require('page/settings/SettingsPage').factory,
				path: 'settings', handler: () => this.transit('settings', {})
			},
			{
				name: 'user', page: require('page/user/UserPage').factory,
				path: 'user', handler: () => this.transit('user', {})
			},
			{
				name: 'contact', page: require('page/contact/ContactPage').factory,
				nav: { label: 'Contact', icon: 'envelope' },
				path: 'contact', handler: () => this.transit('contact', {})
			},
		];
	}
}