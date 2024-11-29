import express from 'express'
import authenticate from '../../middleware/authenticate'
import { bookingController } from './booking.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { bookingValidationSchema } from './booking.validation'


const router = express.Router()

router.post('/' , authenticate , validateRequest(bookingValidationSchema) , bookingController.createBoking)


export const bookingRoutes = router