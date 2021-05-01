import { IBill, IBillInput } from './../models/bill.model'
import { apiProvider } from './utils/provider'

const url = 'bills'
const plural = 'bills'
const single = 'bill'

type IBillResponse = {
    totalCount: number
    data: IBill[]
}

export async function getBillsData(
    page = 0,
    count = 0,
    vehicle = ''
): Promise<IBillResponse> {
    return await apiProvider.getAll<IBillResponse>(plural)
}

export async function createBill(bill: IBillInput): Promise<any> {
    return await apiProvider.post(single, bill)
}
