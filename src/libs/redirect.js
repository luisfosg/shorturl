// @ts-nocheck
import app from '../app';

import * as encrypt from './bcrypt';

const views = async ( res, url, Model ) => {
	if ( url.views !== '' ) {
		if ( url.views === '0' ) return res.render( 'notViews' );
		const { views } = url;
		let num = parseInt( views, 10 );
		num -= 1;
		await Model.findByIdAndUpdate( url._id, { views: num } );
	}
	if ( !url.url.includes( 'http' ) ) {
		url.url = `http://${ url.url }`;
	}

	if ( ( typeof url.clicks ) === 'number' ) {
		const num = url.clicks + 1;
		await Model.findByIdAndUpdate( url._id, { clicks: num } );
	}
	res.redirect( url.url );
};

export const redirectUrl = async ( req, res, error, Model ) => {
	const { path, password } = req.body;

	const url = await Model.findOne( { path } );

	if ( url ) {
		if ( url.password !== '' ) {
			const matchPassword = await encrypt.comparePass( password, url.password );
			if ( matchPassword ) {
				views( res, url, Model );
			} else {
				res.render( 'password', { path, error } );
			}
		} else {
			views( res, url, Model );
		}
	} else {
		res.redirect( '/notfound' );
	}
};

/* ============================================================================================= */

export const getHost = async ( req, _res ) => {
	let host = req.hostname;
	if ( host === 'localhost' ) host = `${ host }:${ app.get( 'port' ) }`;
	if ( req.secure ) {
		host = `${ req.protocol }s://${ host }/l/`;
	} else {
		host = `${ req.protocol }://${ host }/l/`;
	}

	return host;
};

export const renderHome = async ( {
	req,
	res,
	msg = '',
	error = '',
	saveUrl = '',
	findUrl = '',
	data = '',
	edit = ''
} ) => {
	const host = await getHost( req, res );

	res.render( 'home', {
		host,
		saveUrl,
		error,
		msg,
		data,
		findUrl,
		edit
	} );
};

// ===============================================
const invalidSimbolsOne = / |~|;|,|:|#|_|=|¡|¿|'|&|@|%|!|°|"/g;
const invalidSimbolsTwo = /[*]|[\]]|[\\]|[.]|[[]|[{]|[}]|[+]|[?]|[(]|[)]|[<]|[>]|[|]|[$]|[/]/g;
// ===============================================

export const getShortUrl = async ( url ) => {
	url = url.replace( invalidSimbolsOne, '-' );
	url = url.replace( invalidSimbolsTwo, '-' );
	url = url.replace( /ñ/g, 'n' );
	url = url.replace( /--|---|----|-----|------/g, '-' );

	return url;
};
