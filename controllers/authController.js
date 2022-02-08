import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
//

const register = async (req, res) => {

    const {name,email,password} = req.body
        
    if (!name || !email || !password) {
        throw new BadRequestError('Please Provide all values')
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {
        email: user.email,
        clearance: user.clearance,
        manager: user.manager,
        name: user.name,
      },
       token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
  
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token})
  }

  const updateUser = async (req, res) => {
    const { email, name, manager, clearance } = req.body
    if (!email || !name || !manager || !clearance) {
      console.log(req.body)
      throw new BadRequestError('Please bbprovide all values')
    }
  
    const user = await User.findOne({ _id: req.user.userId })
  
    user.email = email
    user.name = name
    user.manager = manager
    user.clearance = clearance
  
    await user.save()
  
    // various setups
    // in this case only id
    // if other properties included, must re-generate
  
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
      user,
      token,
      manager: user.manager,
      clearance: user.clearance,
    })
  }


export {register, login, updateUser}