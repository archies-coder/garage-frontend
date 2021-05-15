export interface ISparePartInput {
    name: string
    category: string
    quantity: number
    brand: string
    cost: number
}

export interface ISparePart extends ISparePartInput {
    _id: string
}
