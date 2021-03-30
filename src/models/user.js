import { Schema, model } from 'mongoose';

const userSchema = new Schema( {
	nick: { type: String, unique: true, required: true },
	password: { type: String, required: true },
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'User', userSchema );
