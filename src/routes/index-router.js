import { Router } from 'express';

import { UrlClass } from '../class/index';

import * as urlCtrl from '../controllers/url-controller';
import * as urlMiddle from '../middlewares/url';

const UrlClassCtrl = UrlClass.getInstance();

const router = Router();

router.get( '/l/:code', UrlClassCtrl.shortUrl );

router.get( '/', urlCtrl.home );
router.get( '/edit/:id', urlCtrl.editUrl );
router.get( '/delete/:psw', urlCtrl.deleteUrls );

router.post( '/password', urlCtrl.password );
router.post(
	'/',
	[urlMiddle.dataEmpy, urlMiddle.userRegister],
	UrlClassCtrl.sendUrl
);

router.get( '/view/:id', UrlClassCtrl.viewUrl );
router.put( '/edit/:id', UrlClassCtrl.editedUrl );
router.delete( '/delete/:id', UrlClassCtrl.deleteUrl );

router.get( '*', urlCtrl.pageNotFound );
router.put( '*', urlCtrl.pageNotFound );
router.post( '*', urlCtrl.pageNotFound );
router.delete( '*', urlCtrl.pageNotFound );

export default router;
