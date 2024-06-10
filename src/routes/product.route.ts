import express from 'express'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import ProductService from '../services/product.service'
import { Product } from '../types/product.type'

const router = express.Router()
const service = new ProductService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const product: Product = req.body
    const newProduct = await service.create(
      product,
      req.body.category as ObjectId
    )
    res.status(201).json(newProduct)
  }
)

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const product: Product = req.body
      const updatedProduct = await service.update(
        product,
        req.body.category as ObjectId
      )
      res.status(200).json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const deletedProduct = await service.delete(req.query.id as string)
      res.status(200).json(deletedProduct)
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
      if (req.query.name) {
        const product = await service.findByName(req.query.name as string)
        res.status(200).json(product)
      } else if (req.query.category) {
        const product = await service.findByCategory(
          req.query.category as string
        )
        res.status(200).json(product)
      } else if (req.query.id) {
        const product = await service.findById(req.query.id as string)
        res.status(200).json(product)
      }
      const product = await service.findAll()
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/products', async (req, res, next) => {
  try {
    if (req.query.name) {
      const product = await service.findByName(req.query.name as string)
      res.status(200).json(product)
    } else if (req.query.category) {
      const product = await service.findByCategory(req.query.category as string)
      res.status(200).json(product)
    } else if (req.query.id) {
      const product = await service.findById(req.query.id as string)
      res.status(200).json(product)
    }
    const product = await service.findAll()
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

export default router
