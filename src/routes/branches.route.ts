import express from 'express'
import BranchService from '../services/branch.service'
import { Branch } from '../types/branch.type'

const router = express.Router()

const service = new BranchService()

router.post('/', async (req, res) => {
  const branch: Branch = req.body
  const newBranch = await service.create(branch)
  res.status(201).json(newBranch)
})

router.get('/', async (_req, res, next) => {
  try {
    const branches = await service.findAll()
    res.status(200).json(branches)
  } catch (error) {
    next(error)
  }
})

export default router