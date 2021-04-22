import { apiProvider } from './utils/provider'
const url = 'vehicle-entries'
const plural = 'vehicle-entries'
const single = 'vehicle-entry'

interface IEntryResponse {
    name: string
}

type IVehicleEntriesResponse = IEntryResponse[]

export async function getAllVehicleEntries() {
    return await apiProvider.getAll<IVehicleEntriesResponse>(plural)
}
