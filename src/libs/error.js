// @ts-nocheck
import urlExists from 'url-exists';

import { getHost } from './redirect';
import { withUser, withoutUser } from '../controllers/data-controller';

export const errorMsg = async ( req, res, msg ) => {
	const {
		destinationUrl,
		passwordUrl,
		views,
		shortUrl,
		nick,
		password
	} = req.body;

	const data = {
		destinationUrl,
		passwordUrl,
		views,
		shortUrl,
		nick,
		password
	};

	const host = await getHost( req, res );

	const saveUrl = '';
	const error = msg;

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data
	} );
};

export const verifyUrl = async ( req, res, url ) => {
	if ( !url.includes( 'http' ) ) {
		url = `http://${url}`;
	}

	urlExists( url, ( _e, isExist ) => {
		if ( isExist ) {
			if ( !req.register ) {
				withoutUser( req, res );
			} else {
				withUser( req, res );
			}
		} else {
			errorMsg( req, res, 'Url Invalida' );
		}
	} );
};
