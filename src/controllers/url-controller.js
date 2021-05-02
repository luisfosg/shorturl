// @ts-nocheck
import User from '../models/user';
import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { renderHome } from '../libs/redirect';
import { errorMsg } from '../libs/error';

/** Renderiza la pagina principal de la aplicación req.headers.host os.hostname();  req.hostname
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const home = async ( req, res ) => {
	renderHome( {
		req,
		res
	} );
};

/** La Función pageNotFound, la ruta ingresada no fue encontrada
 * @type {function}
 * @param {Object} _req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const pageNotFound = async ( _req, res ) => {
	res.render( 'notFound' );
};

/** La Función deleteUrls, Elimina las Url Temporales de la Pagina
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
 * @param {function} res.redirect - función para redireccionar a otra pagina
*/

export const deleteUrls = async ( req, res ) => {
	const { psw } = req.params;
	if ( psw === process.env.DELETEPSW ) {
		await UrlTemp.deleteMany( { key: 'tmp' } );
		errorMsg( {
			req,
			res,
			msg: 'Url Temporales Eliminadas'
		} );
	} else {
		pageNotFound( req, res );
	}
};

export const editUrl = async ( req, res ) => {
	let error = false;
	const { id } = req.params;

	const url = await Url.findById( id ).catch( () => {
		error = true;
	} );

	if ( !url || error ) return res.redirect( '/notfound' );

	const user = await User.findById( url.idUser );

	const { nick } = user;
	const shortUrl = url.path;
	const destinationUrl = url.url;
	const { views } = url;

	renderHome( {
		req,
		res,
		data: {
			id,
			destinationUrl,
			views,
			shortUrl,
			nick
		},
		edit: 'true'
	} );
};
