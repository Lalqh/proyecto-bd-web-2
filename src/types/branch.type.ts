import type { Model } from "mongoose"

export type Branch = {
  id?: string
  name: string
  dirrection: string,
  cellphone: string,
}

export type BranchModel = Model<Branch>