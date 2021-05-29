import { AxiosError, AxiosResponse } from 'axios'

export function handleResponse(response: AxiosResponse) {
    // if (response.results) {
    //     return response.results;
    // }

    if (response.data) {
        return response.data
    }

    return response
}

export function handleError(error: AxiosResponse) {
    if (error.data) {
        return error.data
    }
    return error
}
