import { mock, MockProxy } from 'jest-mock-extended'

describe('Authorize Service', () => {
    let crypto: MockProxy<TokenValidator>
    let sut: Authorize
    const token = 'any_token'

    beforeAll(() => {
        crypto = mock()
        crypto.validate.mockResolvedValue('any_id')
    })

    beforeEach(() => {
        sut = AuthorizeSetup(crypto)
    })

    it('should call TokenValidator with correct param', async () => {
        await sut({ token })

        expect(crypto.validate).toHaveBeenCalledWith({ token })
        expect(crypto.validate).toHaveBeenCalledTimes(1)
    })

    it('should return a UserId on success', async () => {
        const userId = await sut({ token })

        expect(userId).toBe('any_id')
    })
})

export interface TokenValidator {
    validate: (params: TokenValidator.Input) => Promise<TokenValidator.Output>
}

export namespace TokenValidator {
    export type Input = { token: string }
    export type Output = string
}

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Output = string
export type Authorize = (params: Input) => Promise<Output>

const AuthorizeSetup: Setup = (crypto) => async params => {
    return await crypto.validate(params)
}
