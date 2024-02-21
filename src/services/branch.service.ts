import Branches from '../models/branche.model'
import { Branch } from '../types/branch.type'
import boom from '@hapi/boom'

class BranchService {
  async create(branch: Branch) {
    const newBranch = await Branches.create(branch).catch((error) => {
      console.log('Could not save branch', error)
    })

    return newBranch
  }
  async findAll() {
    const branches = await Branches.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!branches) {
      throw boom.notFound('There are not branches')
    }
    
    return branches
  }
}

export default BranchService