import { Schema, model } from 'mongoose'
import { Product, ProductModel,  } from '../types/product.type'
import { CATEGORY_REFENCE } from '../types/category.type'

const Products = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: CATEGORY_REFENCE
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

export default model('Product', Products)