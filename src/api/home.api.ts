import { apiProvider } from './utils/provider'
const url = 'vehicle-entries'
const plural = 'vehicle-entries'
const single = 'vehicle-entry'

interface IEntryResponse {
    name: string
}

type IVehicleEntriesResponse = IEntryResponse[]

export async function getAllVehicleEntries(
    page = 0,
    count = 0,
    vehicle = ''
): Promise<IVehicleEntriesResponse> {
    return await apiProvider.getAll<IVehicleEntriesResponse>(plural)
}
