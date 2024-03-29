export interface TokenGenerator {
    generator: (params: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenGenerator {
    export type Input = {
        key: string
        expiresInMs: number
    }

    export type Output = string
}

export interface TokenValidator {
    validate: (params: TokenValidator.Input) => Promise<TokenValidator.Output>
}

export namespace TokenValidator {
    export type Input = { token: string }
    export type Output = string
}
