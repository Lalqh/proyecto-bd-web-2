import express from 'express'
import passport from 'passport'
import { UserRequestType as RequestType } from '../types/user.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: RequestType, res, next) => {
    try {
      const { user } = req
      //sub is the id of the subscribed user
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecret)
      
      const dataUser = {
        id: user.id,
        name: user.name,
        emial: user.email,
        addres: user.address,
        phoneNumber: user.phoneNumber
      }

      res.status(200).json({ dataUser, token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

export default router
