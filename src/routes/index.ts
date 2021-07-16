import { Router } from 'express';
import users from './session';
import file from './files';

const router = Router();

router.use('/file', file);
router.use('/users', users);
export default router;
