interface IBillEntry {
    name: string
    cost: number
}

export interface IBillInput {
    items: Array<IBillEntry>
    vehicleEntryId: number
}

export interface IBill extends IBillInput {
    _id: string
}
