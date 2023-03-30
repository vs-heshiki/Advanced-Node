export interface TokenGenerator {
    genToken: (params: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenGenerator {
    export type Input = {
        key: string
        expiresInMs: number
    }

    export type Output = string
}
