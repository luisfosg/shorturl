// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import qrcode from 'qrcode';

import * as encrypt from '../libs/bcrypt';

import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import {
	getShortUrl,
	getHost,
	redirectUrl,
	renderHome
} from '../libs/redirect';

import { errorMsg } from '../libs/error';

export const password = async ( req, res ) => {
	const { path } = req.body;
	const error = 'true';

	if ( path.includes( '-tmp' ) ) {
		redirectUrl( req, res, error, UrlTemp );
	} else {
		redirectUrl( req, res, error, Url );
	}
};

const getCode = async ( type ) => {
	let code = '';
	if ( type === 'tmp' ) {
		code = uuidv4();
		code = code.substr( 0, 4 );
		code += '-tmp';

		const getUrl = await UrlTemp.findOne( { path: code } );
		if ( getUrl ) {
			code = await getCode( 'tmp' );
		}
	} else {
		code = uuidv4();
		code = code.substr( 0, 4 );

		const getUrl = await Url.findOne( { path: code } );
		if ( getUrl ) {
			code = await getCode( 'user' );
		}
	}
	return code;
};

export const RegisterUrl = class {
	constructor( req, res ) {
		this.req = req;
		this.res = res;
	}

	static async saveUrlInDb( Model, data ) {
		const newUrl = new Model( {
			...data
		} );
		return newUrl;
	}

	async workflowUrl( type, Model ) {
		const {
			destinationUrl,
			passwordUrl
		} = this.req.body;

		let { shortUrl, views } = this.req.body;
		let password;

		if ( shortUrl === '' ) {
			shortUrl = await getCode( type );
		} else {
			shortUrl = await getShortUrl( shortUrl );
			const getUrl = await Url.findOne( { path: shortUrl } );
			if ( getUrl ) {
				return errorMsg( this.req, this.res, 'El Short Url Ingresado ya Existe' );
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

		const qr = await qrcode.toDataURL( qrUrl );
		const data = {
			path: shortUrl,
			url: destinationUrl,
			password,
			views,
			qr,
			idUser: this.req.user._id
		};

		const saveUrl = await RegisterUrl.saveUrlInDb( Model, data );
		saveUrl.user = this.req.user.nick;

		renderHome( {
			req: this.req,
			res: this.res,
			saveUrl
		} );
	}
};

export const withoutUser = async ( req, res ) => {
	const {
		destinationUrl,
		passwordUrl
	} = req.body;

	let { shortUrl, views } = req.body;
	let password;

	if ( shortUrl === '' ) {
		shortUrl = await getCode( 'tmp' );
	} else {
		shortUrl += '-tmp';
		shortUrl = await getShortUrl( shortUrl );
		const getUrl = await UrlTemp.findOne( { path: shortUrl } );
		if ( getUrl ) {
			return errorMsg( req, res, 'El Short Url Ingresado ya Existe' );
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

	const host = await getHost( req, res );
	let qrUrl = host;
	qrUrl += shortUrl;

	const qr = await qrcode.toDataURL( qrUrl );

	const newUrlTmp = new UrlTemp( {
		path: shortUrl,
		url: destinationUrl,
		password,
		views,
		qr
	} );

	renderHome( {
		req,
		res,
		saveUrl: await newUrlTmp.save()
	} );
};
