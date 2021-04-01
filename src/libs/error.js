import app from '../app';

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

	let host = req.hostname;
	if ( host === 'localhost' ) host = `${ host }:${ app.get( 'port' ) }`;
	host = `${ req.protocol }://${ host }/l/`;

	const saveUrl = '';
	const error = msg;

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data
	} );
};
