// @ts-nocheck
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
