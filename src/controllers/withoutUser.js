// @ts-nocheck
import UrlTemp from '../models/urlTemp';

import { RegisterUrl } from './registerUrl';

export const RegisterUrlWithoutUser = class extends RegisterUrl {
	constructor( req, res ) {
		super( req, res );
		this.type = 'tmp';
		this.Model = UrlTemp;
	}

	// eslint-disable-next-line class-methods-use-this
	data( {
		shortUrl,
		destinationUrl,
		password,
		views,
		qr
	} ) {
		return {
			path: shortUrl,
			url: destinationUrl,
			password,
			views,
			qr
		};
	}

	save() {
		this.workflowUrl( this.Model, this.type );
	}
};
