import { getHost } from './redirect';

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
