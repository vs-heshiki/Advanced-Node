import { ChangeProfilePhoto, ChangeProfilePhotoSetup } from '@/domain/services'
import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'

import { MockProxy, mock } from 'jest-mock-extended'

describe('ChangeProfilePhoto Service', () => {
    let uuid: string
    let file: Buffer
    let uploadFile: MockProxy<UploadFile>
    let crypto: MockProxy<UUIDGenerator>
    let sut: ChangeProfilePhotoSetup

    beforeAll(() => {
        uuid = 'any_unique_id'
        file = Buffer.from('any_buffer')
        uploadFile = mock()
        crypto = mock()
        crypto.generate.mockReturnValue(uuid)
    })

    beforeEach(() => {
        sut = ChangeProfilePhoto(uploadFile, crypto)
    })

    it('should call update with correct input', async () => {
        await sut({ file, userId: 'any_id' })

        expect(uploadFile.update).toHaveBeenCalledWith({ file, key: uuid })
        expect(uploadFile.update).toHaveBeenCalledTimes(1)
    })
})
