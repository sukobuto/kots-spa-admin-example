/// <reference path="../references.d.ts" />
export = Toaster;

class Toaster {
	
	public success(title : string, message : string) {
		this.toast('success', title, message);
	}
	
	public info(title : string, message : string) {
		this.toast('info', title, message);
	}
	
	public warning(title : string, message : string) {
		this.toast('warning', title, message);
	}

	public danger(title : string, message : string) {
		this.toast('danger', title, message);
	}
	
	public error(message : string) {
		this.danger('エラー', message);
	}
	
	private toast(priority : string, title : string, message : string) {
		$.toaster({
			priority: priority,
			title: title,
			message: message
		});
	}
	
}