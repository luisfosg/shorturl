import User from '../models/user';
import * as encrypt from '../libs/bcrypt';

const dataUser = async ( req, res, next, user ) => {
	const { password } = req.body;
	const matchPassword = await encrypt.comparePass( password, user.password );

	if ( matchPassword ) {
		req.user = user;
		next();
	} else {
		res.status( 200 ).json( { error: 'Contraseña Incorrecta, Ese usuario ya Existe' } );
	}
};

/** Metodo POST para guardar URLs
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {function} next - continuar con el siguiente middleware
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
*/

export const userRegister = async ( req, res, next ) => {
	if ( !req.register ) return next();
	const {
		nick,
		password
	} = req.body;

	const findUser = await User.findOne( { nick } );

	if ( findUser ) {
		dataUser( req, res, next, findUser );
	} else {
		const newUser = new User( {
			nick,
			password: await encrypt.encriptPass( password ),
		} );
		const userSave = await newUser.save();

		req.user = userSave;
		next();
	}
};

/** Metodo POST para guardar URLs
 * @type {function}
 * @param {Object} req - "request" de la ruta
 * @param {function} next - continuar con el siguiente middleware
 * @param {Object} res - "response" de la ruta
 * @param {function} res.status - función para enviar un estado http con json
*/

export const dataEmpy = async ( req, res, next ) => {
	req.register = false;
	req.urlSend = false;

	const {
		nick,
		password,
		destinationUrl,
	} = req.body;

	if ( nick !== '' || password !== '' ) {
		req.register = true;
	}

	if ( destinationUrl !== '' ) {
		req.urlSend = true;
	}

	if ( !req.register && !req.urlSend ) return res.status( 200 ).json( { error: 'Campos Vacios' } );
	if ( ( nick === '' || password === '' ) && req.register ) {
		return res.status( 200 ).json( { error: 'Usuario y Contraseña Necesarios' } );
	}

	next();
};
