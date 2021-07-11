import { IBill, IBillInput } from './../models/bill.model'
import { apiProvider, IApiProvider } from './utils/provider'

const url = 'bills'
const plural = 'bills'
const single = 'bill'

export type IBillResponse = {
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

export default function createBillApi({
    getAll,
    getSingle,
    post,
}: IApiProvider) {
    const url = ''
    return {
        bill: () => ({
            getById: (id: string | number) => getSingle(single, id.toString()),
            getAll: <T = void>(page = 0, count = 0, vehicle = '') =>
                getAll<T>(plural),
            create: async (bill: IBillInput) => {
                debugger
                return await post(single, bill)
            },
        }),
    }
}
