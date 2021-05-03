// @ts-nocheck
import Url from '../models/url';

import { getShortUrl } from '../libs/redirect';

import { RegisterUrl } from './data-controller';

export const RegisterUrlWithUser = class extends RegisterUrl {
	/**
	 * @param {any} req
	 * @param {any} res
	 */
	constructor( req, res ) {
		super( req, res );
		this.type = 'User';
		this.Model = Url;
	}

	async workflowShortUrl( shortUrl ) {
		shortUrl = await getShortUrl( shortUrl );
		const getUrl = await this.Model.findOne( { path: shortUrl } );
		if ( getUrl ) {
			return false;
		}
		return shortUrl;
	}

	save() {
		this.workflowUrl( this.Model, this.type );
	}
};
