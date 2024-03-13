import { Model } from 'mongoose'
import { Category } from './category.type'

export type Product = {
  id?: string
  name: string,
  description?: string
  price: number
  stock: number
  image?: string,
  category: Category
  createdAt?: Date
  lastModified?: Date
}




export type ProductModel = Model<Product>
