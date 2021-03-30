import { Schema, model } from 'mongoose';

const urlSchema = new Schema( {
	path: { type: String, unique: true },
	url: { type: String },
	password: { type: String },
	views: { type: String },
	qr: { type: String },
	idUser: { type: String }
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Url', urlSchema );
