import express from 'express'
const router = express.Router()

import 
{ createBooking, deleteBooking, getAllBookings, updateBooking, showStats }
 from '../controllers/bookingController.js'

 router.route('/').post(createBooking).get(getAllBookings)
 router.route('/stats').get(showStats)
 router.route('/:id').delete(deleteBooking).patch(updateBooking)

 export default router