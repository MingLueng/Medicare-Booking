import express from 'express'
import { authenticate } from "./../auth/verifyToken.js";
import { getCheckOutSession } from '../Controller/bookingController.js';
const router = express.Router()

router.post('/checkout-session/:doctorId',authenticate,getCheckOutSession)

export default router;