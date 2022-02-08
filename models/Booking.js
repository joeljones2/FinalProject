import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
    {
        roomid: {
            type: String,
            required: [true, 'Please provide room ID'],
            enum: ['Main Office 1', 'Main Office 2', 'Secure Room 1', 'Secure Room 2', 'Secure Room 3', 'Collab Zone'],
          },
        deskid: {
            type: String,
            required: [true, 'Please provide desk ID'],
            enum: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6',
                   'A7', 'A8', 'A9', 'A10', 'A11', 'A12',
                   'A13', 'A14', 'A15', 'A16'], 
          },
        date: {
            type: Date,
            required: [true, 'Please provide date'],
          },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
          },
        },
        { timestamps: true },
)

export default mongoose.model('Booking', BookingSchema)