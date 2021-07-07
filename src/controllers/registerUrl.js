// @ts-nocheck
import qrcode from 'qrcode';

import * as encrypt from '../libs/bcrypt';

import {
	getShortUrl,
	getHost,
	getCode,
	renderHome
} from '../libs/redirect';

import { errorMsg } from '../libs/error';

export const RegisterUrl = class {
	constructor( req, res ) {
		this.req = req;
		this.res = res;
	}

	// eslint-disable-next-line class-methods-use-this
	data() {}

	// eslint-disable-next-line class-methods-use-this
	async workflowShortUrl( Model, shortUrl ) {
		shortUrl = await getShortUrl( shortUrl );
		const getUrl = await Model.findOne( { path: shortUrl } );
		if ( getUrl ) {
			return false;
		}
		return shortUrl;
	}

	static async saveUrlInDb( Model, data ) {
		const newUrl = new Model( {
			...data
		} );
		return newUrl;
	}

	async workflowUrl( Model, type ) {
		const {
			destinationUrl,
			passwordUrl
		} = this.req.body;

		let { shortUrl, views } = this.req.body;
		let password;

		if ( shortUrl === '' ) {
			shortUrl = await getCode( type );
		} else {
			if ( type === 'tmp' ) {
				shortUrl += '-tmp';
			} else if ( shortUrl.endsWith( 'tmp' ) ) {
				return errorMsg( {
					req: this.req,
					res: this.res,
					error: 'you can\'t use tmp, at the end of your short_url'
				} );
			}

			shortUrl = await this.workflowShortUrl( Model, shortUrl );
			if ( !shortUrl ) {
				return errorMsg( {
					req: this.req,
					res: this.res,
					error: 'The entered Short Url already exists'
				} );
			}
		}

		if ( views !== '' ) {
			try {
				views = parseInt( views, 10 );
				if ( views < 0 ) views = '';
				views = views.toString();
			} catch ( e ) {
				views = '';
			}
		}

		if ( passwordUrl === '' ) {
			password = '';
		} else {
			password = await encrypt.encriptPass( passwordUrl );
		}

		const host = await getHost( this.req, this.res );
		let qrUrl = host;
		qrUrl += shortUrl;

		const opts = {
			errorCorrectionLevel: 'H',
			type: 'image/png',
			quality: 0.3,
			margin: 2,
			color: {
			  dark:"#151515FF",
			  light:"#FFFFFF80"
			}
		}
		const qr = await qrcode.toDataURL( qrUrl, opts );

		const data = this.data( {
			qr,
			shortUrl,
			destinationUrl,
			views,
			password
		} );

		const saveUrl = await RegisterUrl.saveUrlInDb( Model, data );
		if ( type === 'user' ) saveUrl.user = this.req.user.nick;
		await saveUrl.save();

		renderHome( {
			req: this.req,
			res: this.res,
			saveUrl
		} );
	}
};
