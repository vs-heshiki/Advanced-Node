import { TokenValidator } from '@/domain/contracts/crypto/token-validator'
import { Authorize, AuthorizeSetup } from '@/domain/services/authorize'
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

    it('should throw if TokenValidator fails', async () => {
        crypto.validate.mockRejectedValueOnce(new Error('validation_failed'))

        const promise = sut({ token })

        await expect(promise).rejects.toThrow()
    })
})
