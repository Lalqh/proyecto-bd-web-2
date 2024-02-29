import Users from '../models/user.model'
import { User } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })

    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }

    const lastUserRegistered = {name: newUser.name, email: newUser.email, createdAt: newUser.createdAt, id: newUser._id}

    return lastUserRegistered
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }
    return {name: user.name, email: user.email, createdAt: user.createdAt, id: user._id}
  }
}

export default UserService