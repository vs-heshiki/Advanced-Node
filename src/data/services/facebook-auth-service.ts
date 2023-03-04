import { LoadFacebookUser } from '@/data/contracts/apis'
import { CreateUserFacebookRepository, LoadUserAccountRepository } from '@/data/contracts/repositories'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly facebookApi: LoadFacebookUser,
        private readonly userAccountRepository: LoadUserAccountRepository & CreateUserFacebookRepository
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        const facebookData = await this.facebookApi.loadUser(params)
        if (facebookData !== undefined) {
            await this.userAccountRepository.load({ email: facebookData.email })
            await this.userAccountRepository.createWithFacebook(facebookData)
        }
        return new AuthenticatorError()
    }
}
