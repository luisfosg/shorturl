// @ts-nocheck
import User from '../models/user';
import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { renderHome, redirectUrl } from '../libs/redirect';
import { verifyUrl, errorMsg } from '../libs/error';
import { userInfo } from '../libs/infoUser';

import * as encript from '../libs/bcrypt';

export const UrlClass = class {
	static async sendUrl( req, res ) {
		if ( !req.urlSend ) return userInfo( req, res );
		const { destinationUrl } = req.body;

		verifyUrl( req, res, destinationUrl );
	}

	static async shortUrl( req, res ) {
		const { code } = req.params;

		req.body.path = code;
		req.body.password = '';
		const error = 'false';

		if ( code.includes( '-tmp' ) ) {
			redirectUrl( req, res, error, UrlTemp );
		} else {
			redirectUrl( req, res, error, Url );
		}
	}

	static async viewUrl( req, res ) {
		const { id } = req.params;
		let error = false;

		const saveUrl = await Url.findById( id ).catch( () => {
			error = true;
		} );
		if ( error ) return res.render( 'notFound' );

		const user = await User.findById( saveUrl.idUser ).catch( () => {
			res.render( 'notFound' );
		} );
		if ( error ) return res.render( 'notFound' );
		saveUrl.user = user.nick;

		renderHome( {
			req,
			res,
			saveUrl
		} );
	}

	static async deleteUrl( req, res ) {
		const { id } = req.params;
		const deleteUrl = await Url.findByIdAndDelete( id );

		res.status( 200 ).json( deleteUrl );
	}

	static async editedUrl( req, res ) {
		let error = false;
		const {
			nick,
			password
		} = req.body;
		let { views, passwordUrl } = req.body;

		const url = await Url.findById( req.params.id ).catch( () => {
			error = true;
		} );

		if ( !url || error ) {
			return errorMsg( {
				req,
				res,
				error: 'Url no encontrada.',
				edit: 'true'
			} );
		}

		const user = await User.findOne( { nick } );
		if ( !user ) {
			return errorMsg( {
				req,
				res,
				error: 'Usuario no encontrado.',
				edit: 'true'
			} );
		}
		const matchPassword = await encript.comparePass( password, user.password );
		if ( !matchPassword ) {
			return errorMsg( {
				req,
				res,
				error: 'Contraseña Incorrecta',
				edit: 'true'
			} );
		}

		// eslint-disable-next-line eqeqeq
		if ( url.idUser != user._id ) {
			return errorMsg( {
				req,
				res,
				error: 'El Usuario No Posee los permisos necesarios.',
				edit: 'true'
			} );
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
			passwordUrl = '';
		} else {
			passwordUrl = await encript.encriptPass( passwordUrl );
		}
		await Url.findByIdAndUpdate( url._id, {
			views,
			password: passwordUrl
		} );

		renderHome( {
			req,
			res,
			msg: 'Url Editada correctamente'
		} );
	}
};
