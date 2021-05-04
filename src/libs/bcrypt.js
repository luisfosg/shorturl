// @ts-nocheck
import bcrypt from 'bcryptjs';

export const encriptPass = async ( password ) => {
	const salt = await bcrypt.genSalt( 10 );
	return bcrypt.hash( password, salt );
};

// eslint-disable-next-line arrow-body-style
export const comparePass = async ( password, comparepassword ) => {
	return bcrypt.compare( password, comparepassword );
};
