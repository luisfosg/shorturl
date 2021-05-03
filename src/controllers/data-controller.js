// @ts-nocheck
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

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

	data() {}

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
			if ( type === 'tmp' ) shortUrl += '-tmp';
			shortUrl = await this.workflowShortUrl( Model, shortUrl );
			if ( !shortUrl ) {
				return errorMsg( {
					req: this.req,
					res: this.res,
					error: 'El Short Url Ingresado ya Existe'
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

		const qr = await qrcode.toDataURL( qrUrl );

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
