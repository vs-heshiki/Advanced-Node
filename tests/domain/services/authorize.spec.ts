import { mock, MockProxy } from 'jest-mock-extended'

describe('Authorize Service', () => {
    let crypto: MockProxy<TokenValidator>
    let sut: Authorize
    const token = 'any_token'

    beforeAll(() => {
        crypto = mock()
    })

    beforeEach(() => {
        sut = AuthorizeSetup(
            crypto
        )
    })

    it('should call TokenValidator with correct param', async () => {
        await sut({ token })

        expect(crypto.validate).toHaveBeenCalledWith({ token })
        expect(crypto.validate).toHaveBeenCalledTimes(1)
    })
})

export interface TokenValidator {
    validate: (params: TokenValidator.Params) => Promise<void>
}

export namespace TokenValidator {
    export type Params = { token: string }
}

type Authorize = (params: { token: string }) => Promise<void>

export type Setup = (crypto: TokenValidator) => Authorize

const AuthorizeSetup: Setup = (crypto) => async params => {
    await crypto.validate(params)
}
