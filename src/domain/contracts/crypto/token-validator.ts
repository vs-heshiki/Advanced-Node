export interface TokenValidator {
    validate: (params: TokenValidator.Input) => Promise<TokenValidator.Output>
}

export namespace TokenValidator {
    export type Input = { token: string }
    export type Output = string
}
