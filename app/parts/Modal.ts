/// <reference path="../references.d.ts" />
import Component = require('../Component');
export = Modal;

interface TemplateBindObject {
	name: string;
	data?: any;
}

class Modal extends Component {

	public shown:KnockoutObservable<boolean>;
	public size:string = null;
	public header:TemplateBindObject = null;
	public body:TemplateBindObject = null;
	public footer:TemplateBindObject = null;
	public actionSuspended = false;

	constructor() {
		super();
		ko.track(this);
		this.shown = ko.observable(false);
		this.shown.subscribe(function (shown) {
			if (!shown) {
				this.size = null;
				this.header = null;
				this.body = null;
				this.footer = null;
			}
		});
	}

	/**
	 * モーダルダイアログの横幅サイズを変更
	 * @param size 'large' または 'small'
	 * @returns {Modal}
	 */
	public setSize(size:string):Modal {
		this.size = size;
		return this;
	}

	/**
	 * @param template テンプレートID
	 * @param data バインドするデータコンテキストまたは ViewModel
	 * @returns {Modal}
	 */
	public setCustomHeader(template:string, data:any):Modal {
		this.header = {name: template, data: data};
		return this;
	}

	/**
	 * @param template テンプレートID
	 * @param data バインドするデータコンテキストまたは ViewModel
	 * @returns {Modal}
	 */
	public setCustomBody(template:string, data:any):Modal {
		this.body = {name: template, data: data};
		return this;
	}

	/**
	 * @param template テンプレートID
	 * @param data バインドするデータコンテキストまたは ViewModel
	 * @returns {Modal}
	 */
	public setCustomFooter(template:string, data:any):Modal {
		this.footer = {name: template, data: data};
		return this;
	}

	public setHeader(label:string):Modal {
		return this.setCustomHeader('modalHeader', {label: label});
	}

	public setBody(content:string):Modal {
		return this.setCustomBody('modalBody', {content: content});
	}

	public setFooter(action:()=>void, primaryLabel:string, closeLabel:string):Modal {
		var data = {
			action: action,
			primaryLabel: primaryLabel,
			closeLabel: closeLabel,
			hasError: false
		};
		ko.track(data);
		return this.setCustomFooter('modalFooter', data);
	}

	public show():Modal;
	public show(title:string, content:string, closeLabel?:string):Modal;
	public show(title:string, content:string, action:() => void, primaryLabel?:string, closeLabel?:string):Modal;
	public show(arg1?:any, arg2?:any, arg3?:any, arg4?:string, arg5?:string):Modal {
		if (arg1 != null) {
			this.setHeader(arg1);
			this.setBody(arg2);
			if (typeof arg3 == 'function') {
				this.setFooter(arg3, arg4 || 'OK', arg5 || 'Cancel');
			} else {
				this.setFooter(null, '', arg3 || 'OK');
			}
		}
		this.shown(true);
		return this;
	}

	public close():Modal {
		this.shown(false);
		return this;
	}

}

Component.register('modal', Modal, require('./Modal.html'));
