import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadUserAccount, SaveUserFacebook } from '@/domain/contracts/repositories'
import { AuthenticatorError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
    facebook: LoadFacebookUser,
    userAccount: LoadUserAccount & SaveUserFacebook,
    token: TokenGenerator
) => FacebookAuth
type Input = { token: string }
type Output = { accessToken: string }

export type FacebookAuth = (params: Input) => Promise<Output>

export const FacebookAuthSetup: Setup = (facebook, userAccount, token) => async params => {
    const facebookData = await facebook.loadUser(params)

    if (facebookData === undefined) throw new AuthenticatorError()
    const accountData = await userAccount.load({ email: facebookData.email })
    const facebookAccount = new FacebookAccount(facebookData, accountData)
    const { id } = await userAccount.saveWithFacebook(facebookAccount)
    const accessToken = await token.generator({ key: id, expiresInMs: AccessToken.expiresInMs })
    return { accessToken }
}
