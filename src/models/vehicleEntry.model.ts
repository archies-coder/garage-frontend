export interface IVehicleEntry {
    [key: string]: {
        _id: string
        vehicleMake: string
        vehicleModel: string
        vehicleType: string
        vehicleNo: string
        customerName: string
        customerMobile: number
        customerAddress: string
        purpose: string
        intime: string
        remark: string
        createdAt: string
        updatedAt: string
    }
}

export interface ISingleVehicleEntry {
    _id: string
    vehicleMake: string
    vehicleModel: string
    vehicleType: string
    vehicleNo: string
    customerName: string
    customerMobile: number
    customerAddress: string
    purpose: string
    intime: string
    remark: string
    createdAt: string
    updatedAt: string
}
