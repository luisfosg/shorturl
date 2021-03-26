import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controller';

const router = Router();

router.get( '/', urlCtrl.home );

export default router;
