interface IBillEntry {
    name: string
    cost: number
}

export interface IBillInput {
    items: Array<IBillEntry>
    vehicleEntryId: number
}

export interface IGETBillsResponseEntity {
    _id: string
    vehicleEntryId: string
    name: string
    cost: number
    customerName: string
    customerMobile: number
    customerAddress: string
    createdAt: string
    updatedAt: string
}

export interface IBill extends IBillInput {
    _id: string
}
