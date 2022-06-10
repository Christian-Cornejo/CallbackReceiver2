import express from 'express';
import controller from '../controllers/callback';

const router = express.Router();

router.get('/receiver', controller.callbackReceiver);

export = router;