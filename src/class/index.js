// @ts-nocheck
import User from '../models/user';
import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { renderHome, redirectUrl } from '../libs/redirect';
import * as user from '../libs/infoUser';
import { verifyUrl } from '../libs/error';

export const UrlClass = class {
	/**
	 * @param {{ urlSend: any; body: { destinationUrl: any; }; }} req
	 * @param {any} res
	 */
	static async sendUrl( req, res ) {
		if ( !req.urlSend ) return user.userInfo( req, res );
		const { destinationUrl } = req.body;

		verifyUrl( req, res, destinationUrl );
	}

	/**
	 * @param {{ params: { code: any; }; body: { path: any; password: string; }; }} req
	 * @param {any} res
	 */
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
		const saveUrl = await Url.findById( id );
		const user = await User.findById( saveUrl.idUser );
		saveUrl.user = user.nick;

		renderHome( {
			req,
			res,
			saveUrl
		} );
	}
};
