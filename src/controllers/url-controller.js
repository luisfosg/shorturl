// @ts-nocheck
import User from '../models/user';
import Url from '../models/url';
import UrlTemp from '../models/urlTemp';

import { renderHome, redirectUrl } from '../libs/redirect';
import { errorMsg } from '../libs/error';

export const home = async ( req, res ) => {
	renderHome( {
		req,
		res
	} );
};

export const pageNotFound = async ( _req, res ) => {
	res.render( 'notFound' );
};

export const password = async ( req, res ) => {
	const { path } = req.body;
	const error = 'true';

	if ( path.includes( '-tmp' ) ) {
		redirectUrl( req, res, error, UrlTemp );
	} else {
		redirectUrl( req, res, error, Url );
	}
};

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
