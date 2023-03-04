import { LoadFacebookUser } from '@/data/contracts/apis'
import { CreateUserFacebookRepository, LoadUserAccountRepository, UpdateUserFacebookRepository } from '@/data/contracts/repositories'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly facebookApi: LoadFacebookUser,
        private readonly userAccountRepository: LoadUserAccountRepository & CreateUserFacebookRepository & UpdateUserFacebookRepository
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        const facebookData = await this.facebookApi.loadUser(params)
        if (facebookData !== undefined) {
            const accountData = await this.userAccountRepository.load({ email: facebookData.email })
            if (accountData !== undefined) {
                await this.userAccountRepository.updateWithFacebook({
                    id: accountData.id,
                    facebookId: facebookData.facebookId,
                    name: accountData.name ?? facebookData.name
                })
            } else {
                await this.userAccountRepository.createWithFacebook(facebookData)
            }
        }
        return new AuthenticatorError()
    }
}
