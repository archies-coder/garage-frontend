import { apis } from './Apis'
import { VehicleInfo } from 'pages/home/HomeSlice'
import { apiProvider } from './utils/provider'
const url = 'vehicle-entries'
const plural = 'vehicle-entries'
const single = 'vehicle-entry'

interface IVehicle {
    vehicleNo: string
    vehicleModel: string
    vehicleMake: string
    vehicleType: string
    vehicleImagePath?: string
}

export interface IVehicleEntryObject {
    _id: string
    vehicleId: IVehicle
    purpose: string
    remark: string
    intime: string
    createdAt: string
    updatedAt: string
}

export type IVehicleEntriesResponse = {
    totalCount: number
    data: IVehicleEntryObject[]
}

export async function getAllVehicleEntries(
    page: number | null = 0,
    count: number | null = 0,
    vehicle: string | null = ''
): Promise<IVehicleEntriesResponse> {
    return await apiProvider.getAll<IVehicleEntriesResponse>(plural)
}

export async function getVehicleById(vehicleNo: string): Promise<IVehicle> {
    return await apiProvider.getSingle<IVehicle>(single, vehicleNo)
}

export async function createNewVehicleEntry(
    vehicleFromData: FormData
): Promise<any> {
    // const {
    //     vehicleNo,
    //     vehicleModel,
    //     vehicleMake,
    //     vehicleType,
    //     name,
    //     mobile,
    //     address,
    //     purpose,
    //     intime,
    //     remark,
    // } = vehicle

    await apis.post('/checkin', vehicleFromData, {
        headers: {
            Connection: 'keep-alive',
            'Content-Type': 'multipart/form-data',
        },
    })

    // return await apiProvider.post('checkin', {
    //     vehicleNo: vehicleNo,
    //     vehicleModel: vehicleModel,
    //     vehicleMake: vehicleMake,
    //     vehicleType: vehicleType,
    //     customerName: name,
    //     customerMobile: mobile,
    //     customerAddress: address,
    //     purpose: purpose,
    //     intime: intime,
    //     remark: remark,
    // })
}
