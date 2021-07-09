import { createServer, Model } from "miragejs"


export function makeServer({environment = 'test'} ={}) {
    return createServer({
        environment,
        models: {
            notes: Model
        }
    })
}