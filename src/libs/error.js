// @ts-nocheck
import urlExists from 'url-exists';

import { renderHome } from './redirect';
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

	renderHome( req, res, '', '', {
		destinationUrl,
		passwordUrl,
		views,
		shortUrl,
		nick,
		password
	}, msg );
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
