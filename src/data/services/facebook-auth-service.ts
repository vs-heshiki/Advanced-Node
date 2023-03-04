import { LoadFacebookUser } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveUserFacebookRepository } from '@/data/contracts/repositories'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly facebookApi: LoadFacebookUser,
        private readonly userAccountRepository: LoadUserAccountRepository & SaveUserFacebookRepository
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        const facebookData = await this.facebookApi.loadUser(params)
        if (facebookData !== undefined) {
            const accountData = await this.userAccountRepository.load({ email: facebookData.email })
            await this.userAccountRepository.saveWithFacebook({
                id: accountData?.id,
                email: facebookData.email,
                name: accountData?.name ?? facebookData.name,
                facebookId: facebookData.facebookId
            })
        }
        return new AuthenticatorError()
    }
}
