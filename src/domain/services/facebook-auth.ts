import { LoadFacebookUser } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/domain/contracts/repositories'
import { AuthenticatorError } from '@/domain/services/errors'
import { AccessToken, FacebookAccount } from '@/domain/models'

type Setup = (
    facebookApi: LoadFacebookUser,
    userAccountRepository: LoadUserAccountRepository & SaveUserFacebookRepository,
    crypto: TokenGenerator
) => FacebookAuth

export type FacebookAuth = (params: { token: string }) => Promise<AccessToken | AuthenticatorError>

export const FacebookAuthSetup: Setup = (facebookApi, userAccountRepository, crypto) => async params => {
    const facebookData = await facebookApi.loadUser(params)

    if (facebookData !== undefined) {
        const accountData = await userAccountRepository.load({ email: facebookData.email })
        const facebookAccount = new FacebookAccount(facebookData, accountData)
        const { id } = await userAccountRepository.saveWithFacebook(facebookAccount)
        const key = await crypto.genToken({ key: id, expiresInMs: AccessToken.expiresInMs })
        return new AccessToken(key)
    }
    return new AuthenticatorError()
}
