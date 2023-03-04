import { LoadFacebookUser } from '@/data/contracts/apis'
import { CreateUserAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repositories'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly loadFacebookUser: LoadFacebookUser,
        private readonly loadUserAccountRepository: LoadUserAccountRepository,
        private readonly createUserAccountRepository: CreateUserAccountRepository
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        const facebookData = await this.loadFacebookUser.loadUser(params)
        if (facebookData !== undefined) {
            await this.loadUserAccountRepository.load({ email: facebookData.email })
            await this.createUserAccountRepository.createFromFacebook(facebookData)
        }
        return new AuthenticatorError()
    }
}
