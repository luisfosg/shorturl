// @ts-nocheck
import Url from '../models/url';
import { renderHome } from './redirect';

export const userInfo = async ( req, res ) => {
	const { user } = req;

	const findUrl = await Url.find( { idUser: user._id } );

	findUrl.nick = user.nick;
	findUrl.password = user.password;

	renderHome( {
		req,
		res,
		findUrl
	} );
};
