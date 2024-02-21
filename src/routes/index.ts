import express from 'express'
import CategoryRouter from './category.route'
import BranchRouter from './branches.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', CategoryRouter)
  router.use('/branches', BranchRouter)
}

export default routerApi
