import { Schema, model } from 'mongoose'
import { Branch, BranchModel } from '../types/branch.type'

const Branches = new Schema<Branch, BranchModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    dirrection: {
        type: String,
        required: true,
        trim: true
    },
    cellphone: {
        type: String,
        required: true,
        trim: true
    }
})

export default model('Branch', Branches)