// @ts-nocheck
import User from '../models/user';
import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { redirectUrl, renderHome } from '../libs/redirect';
import { errorMsg } from '../libs/error';
import * as encript from '../libs/bcrypt';

/** Renderiza la pagina principal de la aplicación req.headers.host os.hostname();  req.hostname
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const home = async ( req, res ) => {
	renderHome( req, res );
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

export const deleteUrl = async ( req, res ) => {
	const { id } = req.params;
	const deleteUrl = await Url.findByIdAndDelete( id );

	res.status( 200 ).json( deleteUrl );
};

export const editUrl = async ( req, res ) => {
	const { id } = req.params;
	const url = await Url.findById( id );
	const user = await User.findById( url.idUser );

	const { nick } = user;
	const shortUrl = url.path;
	const destinationUrl = url.url;
	const { views } = url;

	renderHome( req, res, '', '', {
		id,
		destinationUrl,
		views,
		shortUrl,
		nick
	}, '', 'true' );
};

export const editedUrl = async ( req, res ) => {
	const {
		nick,
		password,
		views,
		passwordUrl,
		shortUrl
	} = req.body;
	const url = await Url.findById( req.params.id );
	if ( !url ) return errorMsg( req, res, 'Url no encontrada.', 'true' );

	const user = await User.findOne( { nick } );
	if ( !user ) return errorMsg( req, res, 'Usuario no encontrado.', 'true' );

	const matchPassword = await encript.comparePass( password, user.password );
	if ( !matchPassword ) return errorMsg( req, res, 'Contraseña Incorrecta', 'true' );

	res.status( 200 ).json( { url, user } );
};

export const viewUrl = async ( req, res ) => {
	const { id } = req.params;
	const saveUrl = await Url.findById( id );
	const user = await User.findById( saveUrl.idUser );
	saveUrl.user = user.nick;

	renderHome( req, res, saveUrl );
};
