import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import  {
  updateUserValidateSchema,
  userRoleSchema,
} from './user.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from './user.constants';
import authenticate from '../../middleware/authenticate';


const router = express.Router();
router.get(
  '/users',
  authoRization(USER_ROLE.admin),
  userController.getAllUser,
);

router.get(
  '/me',
  authenticate,
  userController.getSingleUser,
);


router.patch(
  '/users/:userId/role',
  validateRequest(userRoleSchema),
  authoRization(USER_ROLE.admin),
  userController.updateUserRole,
);

router.patch(
  '/users/profile',
  validateRequest(updateUserValidateSchema),
  authoRization(USER_ROLE.user),
  userController.updateProfile,
);

export const userRoutes = router;
