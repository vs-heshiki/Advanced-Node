import { LoadFacebookUser } from '@/data/contracts'
import { AuthenticatorError } from '@/domain/errors'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly loadFacebookUser: LoadFacebookUser
    ) { }

    async execute (params: FacebookAuth.Params): Promise<AuthenticatorError> {
        await this.loadFacebookUser.loadUser(params)
        return new AuthenticatorError()
    }
}
