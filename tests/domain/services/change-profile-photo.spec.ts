import { MockProxy, mock } from 'jest-mock-extended'

describe('ChangeProfilePhoto Service', () => {
    let uuid: string
    let buffer: Buffer
    let uploadFile: MockProxy<UploadFile>
    let crypto: MockProxy<UUIDGenerator>
    let sut: ChangeProfilePhotoSetup

    beforeAll(() => {
        uuid = 'any_unique_id'
        buffer = Buffer.from('any_buffer')
        uploadFile = mock<UploadFile>()
        crypto = mock<UUIDGenerator>()
        crypto.generate.mockReturnValue(uuid)
    })

    beforeEach(() => {
        sut = ChangeProfilePhoto(uploadFile, crypto)
    })

    it('should call update with correct input', async () => {
        await sut({ buffer, userId: 'any_id' })

        expect(uploadFile.update).toHaveBeenCalledWith({ buffer, key: uuid })
        expect(uploadFile.update).toHaveBeenCalledTimes(1)
    })
})

type Setup = (uploadFile: UploadFile, uuid: UUIDGenerator) => ChangeProfilePhotoSetup
type Input = { userId: string, buffer: Buffer }
type ChangeProfilePhotoSetup = (input: Input) => Promise<void>

export const ChangeProfilePhoto: Setup = (uploadFile, uuid) => async ({ userId, buffer }) => {
    await uploadFile.update({ buffer, key: uuid.generate({ key: userId }) })
}

export interface UploadFile {
    update: (input: UploadFile.Input) => Promise<void>
}

export namespace UploadFile {
    export type Input = { buffer: Buffer, key: string }
}

export interface UUIDGenerator {
    generate: (input: UUIDGenerator.Input) => UUIDGenerator.Output
}

export namespace UUIDGenerator {
    export type Input = { key: string }
    export type Output = string
}
