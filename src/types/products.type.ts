import { Model } from 'mongoose'
import { Category } from './category.type'

export type Product = ToClientProduct & {
  createdAt?: Date
  lastModified?: Date
}

export type ProductType = Request & {
  product: Product
}

export type ToClientProduct = {
  id?: string
  name: string,
  description?: string
  price: number
  stock: number
  image?: string,
  category: Category
}

export type ProductMethods = {
  toClient: () => ToClientProduct
}

export type ProductModel = Model<Product, {}, ProductMethods>
