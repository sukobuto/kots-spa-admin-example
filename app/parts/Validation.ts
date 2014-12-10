/// <reference path="../references.d.ts" />
export = Validation;

class Validation {
	
	public active = false;
	public validatedViewModel:any;
	public additional_errors:ValidationError[] = [];
	
	constructor(validatedViewModel:any) {
		ko.track(this);
		this.validatedViewModel = ko.validatedObservable(validatedViewModel);
	}
	
	public isValid = ():boolean => {
		return this.validatedViewModel.isValid() && this.additional_errors.length == 0;
	};

	public hasError = (field:string):boolean => {
		if (!this.active) return false;
		if (this.validatedViewModel().hasOwnProperty(field)) {
			return !this.validatedViewModel()[field].isValid();
		} else {
			var error = Enumerable.from(this.additional_errors)
				.firstOrDefault(e => e.field === field, null);
			if (error) return true;
		}
		return false;
	};

	public getError = (field:string):string => {
		if (!this.active) return null;
		if (this.validatedViewModel().hasOwnProperty(field)) {
			this.validatedViewModel()[field]();	// 変更を検知するために参照しておく
			return this.validatedViewModel()[field].error;
		} else {
			var error = Enumerable.from(this.additional_errors)
				.firstOrDefault(e => e.field === field, null);
			if (error) return error.message;
		}
	};

	/**
	 * 外部で検査した結果発生したエラーを追加設定する
	 * @param field
	 * @param error
	 */
	public setAdditionalError = (field:string, error:string):void => {
		this.additional_errors.push({ field: field, message: error });
	};

	/**
	 * 外部エラーをクリア
	 */
	public clearAdditionalErrors = ():void => {
		this.additional_errors = [];
	};
	
}

interface ValidationError {
	field:string;
	message:string;
}
