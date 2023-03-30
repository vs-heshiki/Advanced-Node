import { LoadFacebookUser } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/domain/contracts/repositories'
import { AuthenticatorError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
    facebookApi: LoadFacebookUser,
    userAccountRepository: LoadUserAccountRepository & SaveUserFacebookRepository,
    crypto: TokenGenerator
) => FacebookAuth
type Input = { token: string }
type Output = { accessToken: string }

export type FacebookAuth = (params: Input) => Promise<Output>

export const FacebookAuthSetup: Setup = (facebookApi, userAccountRepository, crypto) => async params => {
    const facebookData = await facebookApi.loadUser(params)

    if (facebookData !== undefined) {
        const accountData = await userAccountRepository.load({ email: facebookData.email })
        const facebookAccount = new FacebookAccount(facebookData, accountData)
        const { id } = await userAccountRepository.saveWithFacebook(facebookAccount)
        const accessToken = await crypto.genToken({ key: id, expiresInMs: AccessToken.expiresInMs })
        return { accessToken }
    }
    throw new AuthenticatorError()
}
