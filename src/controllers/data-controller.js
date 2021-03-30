import * as user from '../libs/infoUser';

const withUser = async ( req, res ) => {
	const {
		nick,
		password,
		shortUrl,
		destinationUrl,
		passwordUrl,
		views
	} = req.body;

	res.status( 200 ).json( {
		nick, password, shortUrl, destinationUrl, passwordUrl, views, user: req.user
	} );
};

const withoutUser = async ( req, res ) => {
	const {
		shortUrl,
		destinationUrl,
		passwordUrl,
		views
	} = req.body;

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
