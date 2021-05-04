// @ts-nocheck
import User from '../models/user';
import * as encrypt from '../libs/bcrypt';
import { errorMsg } from '../libs/error';

const dataUser = async ( req, res, next, user ) => {
	const { password } = req.body;
	const matchPassword = await encrypt.comparePass( password, user.password );

	if ( matchPassword ) {
		req.user = user;
		next();
	} else {
		errorMsg( {
			req,
			res,
			error: 'Contraseña Incorrecta, ese Usuario ya Existe'
		} );
	}
};

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

	if ( !req.register && !req.urlSend ) {
		return errorMsg( {
			req,
			res,
			error: 'Faltan Datos Importantes'
		} );
	}
	if ( ( nick === '' || password === '' ) && req.register ) {
		return errorMsg( {
			req,
			res,
			error: 'Usuario y Contraseña Necesarios'
		} );
	}

	next();
};
