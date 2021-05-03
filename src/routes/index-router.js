import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controller';
import * as dataCtrl from '../controllers/data-controller';

import { UrlClass } from '../class/index';
import * as urlMiddle from '../middlewares/url';

/** Genera las rutas para cada una de las Url
 * @type {Object}
*/

const router = Router();

router.get( '/l/:code', UrlClass.shortUrl );

router.get( '/', urlCtrl.home );
router.get( '/view/:id', UrlClass.viewUrl );
router.get( '/edit/:id', urlCtrl.editUrl );
router.get( '/delete/:psw', urlCtrl.deleteUrls );

router.post( '/password', dataCtrl.password );
router.post(
	'/',
	[urlMiddle.dataEmpy, urlMiddle.userRegister],
	UrlClass.sendUrl
);

router.put( '/edit/:id', UrlClass.editedUrl );
router.delete( '/delete/:id', UrlClass.deleteUrl );

router.get( '*', urlCtrl.pageNotFound );

export default router;
