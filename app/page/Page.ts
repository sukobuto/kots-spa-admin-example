
import Component = require('../Component');
export = Page;

class Page extends Component {

	/**
	 * ページ名を取得するメソッド
	 */
	public getName() : string {
		throw new Error('getName method is not implemented.');
	}

	/**
	 * ページごとのテンプレートIDを取得するメソッド
	 */
	public getTemplate() : string {
		throw new Error('getTemplate method is not implemented.');
	}

	/**
	 * 遷移後に呼び出されるイベントメソッド
	 * @param context
	 */
	public load(context : any) : void {

	}

	public static factory() : Page {
		throw new Error('factory method is not implemented.');
	}

}