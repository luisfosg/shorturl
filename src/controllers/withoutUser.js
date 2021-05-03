// @ts-nocheck
import UrlTemp from '../models/urlTemp';

import { RegisterUrl } from './data-controller';

export const RegisterUrlWithoutUser = class extends RegisterUrl {
	constructor( req, res ) {
		super( req, res );
		this.type = 'tmp';
		this.Model = UrlTemp;
	}

	save() {
		this.workflowUrl( this.Model, this.type );
	}
};
