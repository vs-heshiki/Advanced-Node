export interface TokenGenerator {
    genToken: (params: TokenGenerator.Params) => Promise<void>
}

export namespace TokenGenerator {
    export type Params = {
        key: string
    }
}
