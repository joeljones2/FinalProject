import Booking from '../models/Booking.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

const createBooking = async (req, res) => {
    const { roomid, deskid, date } = req.body
  
    if (!roomid || !deskid || !date ) {
      throw new BadRequestError('Please Provide All Values')
    }
  
    req.body.createdBy = req.user.userId
  
    const booking = await Booking.create(req.body)
    res.status(StatusCodes.CREATED).json({ booking })
  }

const getAllBookings = async (req, res) => {
    const bookings = await Booking.find({ createdBy: req.user.userId })

    res
      .status(StatusCodes.OK)
      .json({ bookings, totalBookings: bookings.length, numOfPages: 1 })
}

const updateBooking = (req, res) => {
    res.send('update Booking')
}

const deleteBooking = async (req, res) => {
  const { id: bookingId } = req.params

  const booking = await Booking.findOne({ _id: bookingId })

  if (!booking) {
    throw new NotFoundError(`No booking with id :${bookingId}`)
  }

  checkPermissions(req.user, booking.createdBy)

  await booking.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! booking removed' })
}

const showStats = (req, res) => {
    res.send('show stats')
}

export { createBooking, deleteBooking, getAllBookings, updateBooking, showStats }