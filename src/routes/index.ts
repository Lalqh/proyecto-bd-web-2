import express from 'express'
import CategoryRouter from './category.route'
import BranchRouter from './branches.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import Product from './product.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', CategoryRouter)
  router.use('/branches', BranchRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
  router.use('/products', Product)
}

export default routerApi
