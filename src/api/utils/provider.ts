import { apis } from './../Apis'
import axios from 'axios'
import { handleError, handleResponse } from './response'

export const BASE_URL =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:8000/garage/v1.0'

export interface IApiProvider {
    getAll: <T = void>(
        resource: string,
        params?: IParamObject[] | undefined
    ) => Promise<T>
    getSingle: <T = void>(resource: string, id: string) => Promise<T>
    post: <T = void>(resource: string, model: any) => Promise<T | any>
    put: (resource: string, model: string) => Promise<any>
    patch: (resource: string, model: string) => Promise<any>
    remove: (resource: string, id: string) => Promise<any>
}

interface IParamObject {
    name: string
    value: string
}

async function getAll<T = void>(
    resource: string,
    params?: IParamObject[]
): Promise<T> {
    let query = ''
    if (params) {
        const parts = params.map((param) => {
            return (
                encodeURIComponent(param.name) +
                '=' +
                encodeURIComponent(param.value)
            )
        })
        query = parts.join('&')
    }
    const url = params
        ? `${BASE_URL}/${resource}?${query}`
        : `${BASE_URL}/${resource}`
    return await apis.get(url).then(handleResponse).catch(handleError)
}

async function getSingle<T = void>(resource: string, id: string): Promise<T> {
    return await apis
        .get(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError)
}

async function post<T = void>(resource: string, model: any): Promise<T | any> {
    return await apis
        .post(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function put(resource: string, model: string) {
    return await apis
        .put(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function patch(resource: string, model: string) {
    return await apis
        .patch(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError)
}

async function remove(resource: string, id: string) {
    return await apis
        .delete(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError)
}

export const apiProvider: IApiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
    remove,
}
