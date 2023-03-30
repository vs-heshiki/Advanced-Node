export interface HttpGetClient {
    get: (params: HttpGetClient.Input) => Promise<HttpGetClient.Output>
}

export namespace HttpGetClient {
    export type Input = {
        url: string
        params: object
    }

    export type Output<T = any> = T
}
