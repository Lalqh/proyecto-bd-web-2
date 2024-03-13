import boom from '@hapi/boom'
import { ObjectId } from 'mongoose'
import Products from '../models/product.model'
import Categories from '../models/category.model'
import { Product } from '../types/product.type'

class ProductService {
  async create(product: Product, categoryId: ObjectId) {
    const newProduct = await Products.create({
      ...product,
      category: categoryId
    }).catch((error) => {
      console.log('Could not save product', error)
    })

    const existingProduct = await this.findById((newProduct as any)._id)

    return existingProduct.populate([
      { path: 'category', strictPopulate: false }
    ])
  }

  async findAll() {
    const product = await Products.find()
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!product) {
      throw boom.notFound('There are not products')
    }
    return product
  }

  async findById(id: string) {
    const product = await Products.findById(id)
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }

  async findByName(name: string) {
    const product = await Products.findOne({ name })
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!product) {
      throw boom.notFound('Product not found')
    }

    return product
  }

  async findByCategory(category: string) {
    const categories = await Categories.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Error while connecting to the DB')
      }
    )

    if (!categories) {
      throw boom.notFound('Category not found')
    }

    // Buscar los productos que pertenecen a la categoría encontrada
    const products = await Products.find({ category: categories._id})
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Error while connecting to the DB')
      })

    if (!products || products.length === 0) {
      throw boom.notFound('Products not found for the given category')
    }

    return products
  }
}

export default ProductService
