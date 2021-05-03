import UrlTemp from '../models/urlTemp';

import { RegisterUrl } from './data-controller';

export const RegisterUrlWithoutUser = class extends RegisterUrl {
	/**
	 * @param {any} req
	 * @param {any} res
	 */
	constructor( req, res ) {
		super( req, res );
		this.use = 'tmp';
		this.Model = UrlTemp;
	}

	save() {
		this.workflowUrl( this.use, this.Model );
	}
};
