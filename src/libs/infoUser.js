import Url from '../models/url';
import { getHost } from './redirect';

export const userInfo = async ( req, res ) => {
	const { user } = req;
	const findUrl = await Url.find( { idUser: user._id } );

	const host = await getHost( req, res );
	const saveUrl = '';
	const error = '';
	const data = '';

	res.render( 'home', {
		host,
		saveUrl,
		error,
		data,
		findUrl
	} );
};
