import app from '../app';

import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { redirectUrl } from '../libs/redirect';
import { errorMsg } from '../libs/error';

/** Renderiza la pagina principal de la aplicación req.headers.host os.hostname();  req.hostname
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const home = async ( req, res ) => {
	let host = req.hostname;
	if ( host === 'localhost' ) host = `${ host }:${ app.get( 'port' ) }`;
	host = `${host}/l/`;
	req.socket.encrypted ? host = `https://${host}` : host = `http://${host}`;

	app.set( 'host', host );

	const saveUrl = '';
	const error = '';
	const data = '';

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data
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

/** La Función shortUrl, verifica el link para redirigir a la ruta solicitada
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
 * @param {function} res.redirect - función para redireccionar a otra pagina
*/

export const shortUrl = async ( req, res ) => {
	const { code } = req.params;

	req.body.path = code;
	req.body.password = '';
	const error = 'false';

	if ( code.includes( '-tmp' ) ) {
		redirectUrl( req, res, error, UrlTemp );
	} else {
		redirectUrl( req, res, error, Url );
	}
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
		errorMsg( req, res, 'Url Temporales Eliminadas' );
	} else {
		pageNotFound( req, res );
	}
};
