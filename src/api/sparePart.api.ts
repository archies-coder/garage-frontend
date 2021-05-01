import { ISparePartInput } from './../models/sparePart.model'
import { ISparePart } from 'models/sparePart.model'
import { apiProvider } from './utils/provider'

const url = 'spare-parts'
const plural = 'spare-parts'
const single = 'spare-part'

export type ISparePartsResponse = {
    totalCount: number
    data: ISparePart[]
}

export async function createSparePart(
    sparePart: ISparePartInput
): Promise<any> {
    return await apiProvider.post(single, sparePart)
}

export async function getSparePartsData(
    page = 0,
    count = 0
): Promise<ISparePartsResponse> {
    return await apiProvider.getAll<ISparePartsResponse>(plural)
}
