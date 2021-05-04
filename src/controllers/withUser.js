// @ts-nocheck
import Url from '../models/url';

import { RegisterUrl } from './registerUrl';

export const RegisterUrlWithUser = class extends RegisterUrl {
	constructor( req, res ) {
		super( req, res );
		this.type = 'user';
		this.Model = Url;
	}

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
			qr,
			idUser: this.req.user._id
		};
	}

	save() {
		this.workflowUrl( this.Model, this.type );
	}
};
