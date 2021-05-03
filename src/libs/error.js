// @ts-nocheck
import urlExists from 'url-exists';

import { renderHome } from './redirect';
import { withoutUser } from '../controllers/data-controller';
import { RegisterUrlWithUser } from '../controllers/withUser';

export const errorMsg = async ( {
	req,
	res,
	error,
	edit = '',
	msg = ''
} ) => {
	const {
		destinationUrl,
		passwordUrl,
		views,
		shortUrl,
		nick,
		password
	} = req.body;

	renderHome( {
		req,
		res,
		error,
		edit,
		msg,
		data: {
			destinationUrl,
			passwordUrl,
			views,
			shortUrl,
			nick,
			password,
			id: req.params.id
		}
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
				const data = new RegisterUrlWithUser( req, res );
				data.save();
			}
		} else {
			errorMsg( {
				req,
				res,
				error: 'Url Invalida'
			} );
		}
	} );
};
