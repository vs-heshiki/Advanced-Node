export interface HttpGetClient {
    get: (params: HttpGetClient.Params) => Promise<HttpGetClient.Resolve>
}

export namespace HttpGetClient {
    export type Params = {
        url: string
        params: object
    }

    export type Resolve = any
}
