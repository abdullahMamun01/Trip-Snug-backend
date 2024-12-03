import express from 'express';

import { authoRization } from '../../middleware/authoRization';
import { roomController } from './room.controller';
import authenticate from '../../middleware/authenticate';

const router = express.Router();
router.patch(
  '/:roomId',
  authenticate,
  authoRization('admin'),
  roomController.updateRoom,
);
router.delete(
  '/:roomId',
  authenticate,
  authoRization('admin'),
  roomController.deleteRoom,
);
export const roomRoutes = router;
