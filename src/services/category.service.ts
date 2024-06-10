import Categories from '../models/category.model'
import { Category } from '../types/category.type'
import boom from '@hapi/boom'
import { Types } from 'mongoose'

class CategoryService {
  async create(category: Category) {
    try {
      const newCategory = await Categories.create(category)
      return newCategory
    } catch (error) {
      console.error('Could not save category', error)
      throw boom.badImplementation('Error while saving the category')
    }
  }

  async update(id: string, category: Category) {
    if (!Types.ObjectId.isValid(id)) {
      throw boom.badRequest('Invalid category ID')
    }

    try {
      const updatedCategory = await Categories.findByIdAndUpdate(id, category, {
        new: true
      })
      if (!updatedCategory) {
        throw boom.notFound('Category not found')
      }
      return updatedCategory
    } catch (error) {
      console.error('Could not update category', error)
      throw boom.badImplementation('Error while updating the category')
    }
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw boom.badRequest('Invalid category ID')
    }

    try {
      const deletedCategory = await Categories.findByIdAndDelete(id)
      if (!deletedCategory) {
        throw boom.notFound('Category not found')
      }
      return { message: 'Category successfully deleted' }
    } catch (error) {
      console.error('Could not delete category', error)
      throw boom.badImplementation('Error while deleting the category')
    }
  }

  async findAll() {
    try {
      const categories = await Categories.find()
      return categories
    } catch (error) {
      console.error('Error while connecting to the DB', error)
      throw boom.badImplementation('Error while fetching categories')
    }
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw boom.badRequest('Invalid category ID')
    }

    try {
      const category = await Categories.findById(id)
      if (!category) {
        throw boom.notFound('Category not found')
      }
      return category
    } catch (error) {
      console.error('Error while connecting to the DB', error)
      throw boom.badImplementation('Error while fetching the category')
    }
  }

  async findByName(name: string) {
    try {
      const category = await Categories.findOne({ name })
      if (!category) {
        throw boom.notFound('Category not found')
      }
      return category
    } catch (error) {
      console.error('Error while connecting to the DB', error)
      throw boom.badImplementation('Error while fetching the category')
    }
  }
}

export default CategoryService
