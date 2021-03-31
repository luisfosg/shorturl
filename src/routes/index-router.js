import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controller';
import * as dataCtrl from '../controllers/data-controller';

import * as url from '../middlewares/url';

/** Genera las rutas para cada una de las Url
 * @type {Object}
*/

const router = Router();

router.get( '/', urlCtrl.home );
router.get( '/l/:code', urlCtrl.shortUrl );
router.get( '/delete/:psw', urlCtrl.deleteUrls );

router.post( '/password', dataCtrl.password );
router.post(
	'/url',
	[url.dataEmpy, url.userRegister],
	dataCtrl.sendUrl
);

router.get( '*', urlCtrl.pageNotFound );

export default router;
