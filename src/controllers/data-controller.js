import { v4 as uuidv4 } from 'uuid';

import * as user from '../libs/infoUser';

const getCode = async ( type ) => {
	let code = '';
	if ( type === 'tmp' ) {
		code = uuidv4();
		code = code.substr( 0, 4 );
		code += '-tmp';
	} else {
		code = uuidv4();
		code = code.substr( 0, 4 );
	}
	return code;
};

const withUser = async ( req, res ) => {
	const {
		destinationUrl,
		passwordUrl,
		views
	} = req.body;

	let { shortUrl } = req.body;

	if ( shortUrl === '' ) {
		shortUrl = await getCode( 'user' );
	}

	res.status( 200 ).json( {
		shortUrl, destinationUrl, passwordUrl, views, user: req.user
	} );
};

const withoutUser = async ( req, res ) => {
	const {
		destinationUrl,
		passwordUrl,
		views
	} = req.body;

	let { shortUrl } = req.body;

	if ( shortUrl === '' ) {
		shortUrl = await getCode( 'tmp' );
	}

	res.status( 200 ).json( {
		shortUrl, destinationUrl, passwordUrl, views
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
	const data = req.body;

	res.status( 200 ).json( data );
};
