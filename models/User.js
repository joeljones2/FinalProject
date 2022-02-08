import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please Provide a valid email'
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        maxlength: 20,
        select: false,
    },
    manager: {
        type: String,
        required: [true, 'Please state whether you are a manager'],
        default: 'No',
    },
    clearance: {
        type: String,
        required: [true, 'please state the security clearance you hold'],
        default: 'None'
    }
})

UserSchema.pre('save', async function () {
  if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

  UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }

  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  } 

export default mongoose.model('User', UserSchema)