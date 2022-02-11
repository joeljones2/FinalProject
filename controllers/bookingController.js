import Booking from '../models/Booking.js'
import mongoose from 'mongoose'
import moment from 'moment'
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

const showStats = async (req, res) => {
  let stats = await Booking.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$roomid', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    Main1: stats.Main1 || 0,
    Main2: stats.Main2 || 0,
    S1: stats.S1 || 0,
    S2: stats.S2 || 0,
    S3: stats.S3 || 0,
    CollabZone:  stats.CollabZone  || 0,
  }

  let monthlyBookings = await Booking.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyBookings = monthlyBookings
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ stats, defaultStats, monthlyBookings })
}

export { createBooking, deleteBooking, getAllBookings, updateBooking, showStats }