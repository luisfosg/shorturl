import { Router } from 'express';

import { UrlClass } from '../class/index';

import * as urlCtrl from '../controllers/url-controller';
import * as urlMiddle from '../middlewares/url';

const router = Router();

router.get( '/l/:code', UrlClass.shortUrl );

router.get( '/', urlCtrl.home );
router.get( '/edit/:id', urlCtrl.editUrl );
router.get( '/delete/:psw', urlCtrl.deleteUrls );

router.post( '/password', urlCtrl.password );
router.post(
	'/',
	[urlMiddle.dataEmpy, urlMiddle.userRegister],
	UrlClass.sendUrl
);

router.get( '/view/:id', UrlClass.viewUrl );
router.put( '/edit/:id', UrlClass.editedUrl );
router.delete( '/delete/:id', UrlClass.deleteUrl );

router.get( '*', urlCtrl.pageNotFound );

export default router;
