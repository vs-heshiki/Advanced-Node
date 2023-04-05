import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'

type Setup = (uploadFile: UploadFile, uuid: UUIDGenerator) => ChangeProfilePhotoSetup
type Input = { userId: string, file?: Buffer }
export type ChangeProfilePhotoSetup = (input: Input) => Promise<void>

export const ChangeProfilePhoto: Setup = (uploadFile, uuid) => async ({ userId, file }) => {
    if (file !== undefined) {
        await uploadFile.update({ file, key: uuid.generate({ key: userId }) })
    }
}
