import { apiProvider } from './utils/provider'
import createBillApi from './bill.api'

const billApi = createBillApi(apiProvider)

export default {
    ...billApi,
}
