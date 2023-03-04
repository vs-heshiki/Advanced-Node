import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
    it('should create with correct value', () => {
        const sut = new AccessToken('any_key')

        expect(sut).toEqual({ key: 'any_key' })
    })
})
