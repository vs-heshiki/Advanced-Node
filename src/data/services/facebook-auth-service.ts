import { LoadFacebookUser } from '@/data/contracts/apis'
import { TokenGenerator } from '@/data/contracts/crypto'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/data/contracts/repositories'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'
import { AccessToken, FacebookAccount } from '@/domain/models'

export class FacebookAuthService {
    constructor (
        private readonly facebookApi: LoadFacebookUser,
        private readonly userAccountRepository: LoadUserAccountRepository & SaveUserFacebookRepository,
        private readonly crypto: TokenGenerator
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        const facebookData = await this.facebookApi.loadUser(params)
        if (facebookData !== undefined) {
            const accountData = await this.userAccountRepository.load({ email: facebookData.email })
            const facebookAccount = new FacebookAccount(facebookData, accountData)
            const { id } = await this.userAccountRepository.saveWithFacebook(facebookAccount)
            await this.crypto.genToken({ key: id, expirationInMs: AccessToken.expirationInMs })
        }
        return new AuthenticatorError()
    }
}
