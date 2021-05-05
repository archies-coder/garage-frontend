import { apiProvider } from './utils/provider'
const url = 'vehicle-entries'
const plural = 'vehicle-entries'
const single = 'vehicle-entry'
const stats = 'stats-data'

interface IEntryResponse {
    name: string
}

interface IStatResponse {
    data: {
        delivered: number
        in_garage: number
        parts_used: number
        total_customers: number
        vehicleEntriestats: number[]
    }
}

type IVehicleEntriesResponse = IEntryResponse[]

export async function getAllVehicleEntries(
    page = 0,
    count = 0,
    vehicle = ''
): Promise<IVehicleEntriesResponse> {
    return await apiProvider.getAll<IVehicleEntriesResponse>(plural)
}

export async function getStats(date?: string) {
    return await apiProvider.getAll<IStatResponse>(`${stats}?date=${date}`)
}
