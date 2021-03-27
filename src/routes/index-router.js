import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controller';

/** Genera las rutas para cada una de las Url
 * @type {Object}
*/

const router = Router();

router.get( '/', urlCtrl.home );

export default router;
