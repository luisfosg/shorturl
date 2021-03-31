// @ts-nocheck
import app from '../app';

import UrlTemp from '../models/urlTemp';

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

	app.set( 'host', host );

	res.render( 'home', { host } );
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
	const url = await UrlTemp.findOne( { path: code } );

	if ( url ) {
		if ( url.password !== '' ) {
			const error = 'false';
			const { path } = url;
			res.render( 'password', { path, error } );
		} else {
			if ( url.views !== '' ) {
				if ( url.views === '0' ) return res.render( 'notViews' );
				const { views } = url;
				let num = parseInt( views, 10 );
				num -= 1;
				await UrlTemp.findByIdAndUpdate( url._id, { views: num } );
			}
			res.redirect( url.url );
		}
	} else {
		pageNotFound( req, res );
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
		res.status( 200 ).json( { message: 'Urls Temporales Eliminadas' } );
	} else {
		pageNotFound( req, res );
	}
};
