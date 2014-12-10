import ApiBase = require('./ApiBase');
export = AdminApi;

class AdminApi extends ApiBase {
	
	public init() {
		return this._get(
			'api/init'
		)
	}

	public successDummy() {
		return this._get(
			'api/successDummy'
		)
	}

	public getUsers() {
		return this._get(
			'api/getUsers'
		)
	}
	
	public getMessages(offset:number, limit:number) {
		return this._get(
			'api/getMessages',
			{
				offset: offset,
				limit: limit
			}
		)
	}

}