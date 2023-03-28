import { FacebookAccount } from '@/domain/entities'

describe('FacebookAccount', () => {
    const fbData = {
        name: 'any_fb_name',
        email: 'any_email@facebook.com',
        facebookId: 'any_fb_id'
    }

    it('should create account with facebook data only', () => {
        const sut = new FacebookAccount(fbData)

        expect(sut).toEqual({
            name: 'any_fb_name',
            email: 'any_email@facebook.com',
            facebookId: 'any_fb_id'
        })
    })

    it('should update account with facebook data and account data when name exists', () => {
        const accountData = {
            id: 'any_id',
            name: 'any_name'
        }
        const sut = new FacebookAccount(fbData, accountData)

        expect(sut).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email@facebook.com',
            facebookId: 'any_fb_id'
        })
    })

    it('should update account with facebook data when name not exists', () => {
        const accountData = {
            id: 'any_id'
        }
        const sut = new FacebookAccount(fbData, accountData)

        expect(sut).toEqual({
            id: 'any_id',
            name: 'any_fb_name',
            email: 'any_email@facebook.com',
            facebookId: 'any_fb_id'
        })
    })
})
