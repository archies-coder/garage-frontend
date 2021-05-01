export interface IBillInput {
    name: string
    cost: number
    createdAt: string
    updatedAt: string
    vehicleEntryId: number
}

export interface IBill extends IBillInput {
    _id: string
}
