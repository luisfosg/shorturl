import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controller';
import * as dataCtrl from '../controllers/data-controller';

/** Genera las rutas para cada una de las Url
 * @type {Object}
*/

const router = Router();

router.get( '/', urlCtrl.home );
router.get( '/l/:code', urlCtrl.shortUrl );
router.get( '/password', urlCtrl.password );
router.get( '*', urlCtrl.pageNotFound );

router.post( '/url', dataCtrl.sendUrl );
router.post( '/password', dataCtrl.password );

export default router;
