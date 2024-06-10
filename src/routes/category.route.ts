import express from 'express'
import passport from 'passport'
import CategoryService from '../services/category.service'
import { Category } from '../types/category.type'

const router = express.Router()
const service = new CategoryService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category: Category = req.body
      const newCategory = await service.create(category)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category: Category = req.body
      const { id } = req.params
      const updatedCategory = await service.update(id, category)
      res.status(200).json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const deletedCategory = await service.delete(id)
      res.status(200).json(deletedCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const categories = req.query.name
        ? await service.findByName(req.query.name as string)
        : await service.findAll()
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await service.findById(id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

export default router
