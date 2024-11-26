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
  userController.getAllUserController,
);

router.get(
  '/me',
  authenticate,
  userController.getSingleUserController,
);


router.put(
  '/users/:userId/role',
  validateRequest(userRoleSchema),
  authoRization(USER_ROLE.admin),
  userController.updateUserRoleController,
);

router.put(
  '/me/update-profile',
  validateRequest(updateUserValidateSchema),
  authoRization(USER_ROLE.user),
  userController.updateProfileController,
);

export const userRoutes = router;
