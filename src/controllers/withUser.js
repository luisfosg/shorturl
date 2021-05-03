import UrlTemp from '../models/urlTemp';

import { RegisterUrl } from './data-controller';

export const RegisterUrlWithUser = class extends RegisterUrl {
	/**
	 * @param {any} req
	 * @param {any} res
	 */
	constructor( req, res ) {
		super( req, res );
		this.use = 'User';
		this.Model = UrlTemp;
	}

	save() {
		this.workflowUrl( this.use, this.Model );
	}
};
