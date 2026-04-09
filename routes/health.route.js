import {Router} from 'express';
import env from '../config/env.js';
import { getHealth } from '../controller/health.controller.js';

const router = Router();

router.get('/health', getHealth);

export default router;