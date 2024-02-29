import express from 'express'
import { User } from '../types/user.type'
import UserService from '../services/user.service'

const router = express.Router()
const service = new UserService()

router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query
    const user = await service.findByEmail(email as string)
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser })
  } catch (error) {
    next(error)
  }
})

export default router