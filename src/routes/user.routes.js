import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { getUserById, getAllOwners, getAllInvestors, depositBalance } from '../controllers/user.controller.js';
import { depositBalanceSchema } from '../validators/validators.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/owners', roleMiddleware('admin'), getAllOwners);
router.get('/investors', roleMiddleware('admin'), getAllInvestors);
router.get('/:id', roleMiddleware('admin', 'owner', 'investor'), getUserById);
router.post('/deposit', roleMiddleware('investor'), validateBody(depositBalanceSchema), depositBalance);



export default router