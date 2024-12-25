import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { updateUserValidateSchema, userRoleSchema } from './user.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from './user.constants';
import authenticate from '../../middleware/authenticate';

const router = express.Router();
router.get('/' , authenticate, authoRization(USER_ROLE.admin), userController.getAllUser);
router.get('/me', authenticate, userController.getSingleUser);

router.patch(
  '/:userId/role',
  validateRequest(userRoleSchema),
  authenticate, authoRization(USER_ROLE.admin),
  userController.updateUserRole,
);

router.patch(
  '/profile',
  validateRequest(updateUserValidateSchema),
  authenticate,
  authoRization(USER_ROLE.user, USER_ROLE.admin),
  userController.updateProfile,
);

export const userRoutes = router;
