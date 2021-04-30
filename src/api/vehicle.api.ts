import { apiProvider } from './utils/provider'
const url = 'vehicles'
const plural = 'vehicles'
const single = 'vehicle'

interface IVehicleObject {
    _id: string
    vehicleNo: string
    vehicleModel: string
    vehicleMake: string
    vehicleType: string
    vehicleImagePath?: string
    createdAt: string
    updatedAt: string
    customer: {
        customerName: string
        customerMobile: string
        customerAddress: string
    }
}

export type IVehicleResponse = {
    totalCount: number
    data: IVehicleObject[]
}

export async function getAllVehicles(
    page: number | null = 0,
    count: number | null = 0,
    vehicle: string | null = ''
): Promise<IVehicleResponse> {
    return await apiProvider.getAll<IVehicleResponse>(plural)
}
