const createBooking = (req, res) => {
    res.send('create booking')
}

const getAllBookings = (req, res) => {
    res.send('get all bookings')
}

const updateBooking = (req, res) => {
    res.send('update Booking')
}

const deleteBooking = (req, res) => {
    res.send('delete booking')
}

const showStats = (req, res) => {
    res.send('show stats')
}

export { createBooking, deleteBooking, getAllBookings, updateBooking, showStats }