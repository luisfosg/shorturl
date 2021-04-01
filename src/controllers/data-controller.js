// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import qrcode from 'qrcode';

import app from '../app';

import * as user from '../libs/infoUser';
import * as encrypt from '../libs/bcrypt';

import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { redirectUrl } from '../libs/redirect';
import { errorMsg } from '../libs/error';

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

const withUser = async ( req, res ) => {
	const {
		destinationUrl,
		passwordUrl
	} = req.body;

	let { shortUrl, views } = req.body;
	let password;

	if ( shortUrl === '' ) {
		shortUrl = await getCode( 'user' );
	} else {
		const getUrl = await Url.findOne( { path: shortUrl } );
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

	let qrUrl = app.get( 'host' );
	qrUrl += shortUrl;

	const qr = await qrcode.toDataURL( qrUrl );

	const newUrlTmp = new Url( {
		path: shortUrl,
		url: destinationUrl,
		password,
		views,
		qr,
		idUser: req.user._id
	} );

	const saveUrl = await newUrlTmp.save();
	saveUrl.user = req.user.nick;
	const host = app.get( 'host' );
	const error = '';
	const data = '';

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data
	} );
};

const withoutUser = async ( req, res ) => {
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

	let qrUrl = app.get( 'host' );
	qrUrl += shortUrl;

	const qr = await qrcode.toDataURL( qrUrl );

	const newUrlTmp = new UrlTemp( {
		path: shortUrl,
		url: destinationUrl,
		password,
		views,
		qr
	} );

	const saveUrl = await newUrlTmp.save();
	const host = app.get( 'host' );
	const error = '';
	const data = '';

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data
	} );
};

/** Metodo POST para guardar URLs
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
*/

export const sendUrl = async ( req, res ) => {
	if ( !req.urlSend ) return user.userInfo( req, res );

	if ( !req.register ) {
		withoutUser( req, res );
	} else {
		withUser( req, res );
	}
};

/** Metodo POST para guardar URLs
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
*/

export const password = async ( req, res ) => {
	const { path } = req.body;
	const error = 'true';

	if ( path.includes( '-tmp' ) ) {
		redirectUrl( req, res, error, UrlTemp );
	} else {
		redirectUrl( req, res, error, Url );
	}
};
