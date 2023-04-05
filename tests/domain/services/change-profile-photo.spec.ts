import { ChangeProfilePhoto, ChangeProfilePhotoSetup } from '@/domain/services'
import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { UserProfile } from '@/domain/contracts/repositories'

import { MockProxy, mock } from 'jest-mock-extended'

describe('ChangeProfilePhoto Service', () => {
    let uuid: string
    let file: Buffer
    let uploadFile: MockProxy<UploadFile>
    let crypto: MockProxy<UUIDGenerator>
    let userProfile: MockProxy<UserProfile>
    let sut: ChangeProfilePhotoSetup

    beforeAll(() => {
        uuid = 'any_unique_id'
        file = Buffer.from('any_buffer')
        uploadFile = mock()
        uploadFile.update.mockResolvedValue('any_url')
        crypto = mock()
        crypto.generate.mockReturnValue(uuid)
        userProfile = mock()
    })

    beforeEach(() => {
        sut = ChangeProfilePhoto(uploadFile, crypto, userProfile)
    })

    it('should call update with correct input', async () => {
        await sut({ file, userId: 'any_id' })

        expect(uploadFile.update).toHaveBeenCalledWith({ file, key: uuid })
        expect(uploadFile.update).toHaveBeenCalledTimes(1)
    })

    it('should not call update if file is undefined', async () => {
        await sut({ file: undefined, userId: 'any_id' })

        expect(uploadFile.update).not.toHaveBeenCalled()
    })

    it('should call save photo with correct url', async () => {
        await sut({ file, userId: 'any_id' })

        expect(userProfile.savePhoto).toHaveBeenCalledWith({ photoUrl: 'any_url' })
        expect(userProfile.savePhoto).toHaveBeenCalledTimes(1)
    })
})
