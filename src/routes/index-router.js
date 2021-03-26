import { Router } from 'express';

import * as urlCtrl from '../controllers/url-controllers';

const router = Router();

router.get( '/', urlCtrl.inicio );

export default router;
