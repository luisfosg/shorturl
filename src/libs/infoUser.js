import Url from '../models/url';
import { errorMsg } from './error';

export const userInfo = async ( req, res ) => {
	const { user } = req;
	const findUrl = await Url.find( { idUser: user._id } );

	console.log( findUrl );
	errorMsg( req, res, 'Dando Informacion del Usuario' );
};
