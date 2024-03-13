import type { Model } from 'mongoose'

export const CATEGORY_REFENCE = 'Category'

export type Category = {
  id?: string
  name: string
  description?: string
}

export type CategoryModel = Model<Category>