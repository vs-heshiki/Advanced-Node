import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { UserProfile } from '@/domain/contracts/repositories'

type Setup = (uploadFile: UploadFile, uuid: UUIDGenerator, userProfile: UserProfile) => ChangeProfilePhotoSetup
type Input = { userId: string, file?: Buffer }
export type ChangeProfilePhotoSetup = (input: Input) => Promise<void>

export const ChangeProfilePhoto: Setup = (uploadFile, uuid, userProfile) => async ({ userId, file }) => {
    if (file !== undefined) {
        const photoUrl = await uploadFile.update({ file, key: uuid.generate({ key: userId }) })
        await userProfile.savePhoto({ photoUrl })
    }
}
