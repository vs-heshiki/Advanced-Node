import { LoadFacebookUser } from '@/data/contracts'
import { FacebookAuth } from '@/domain/features'

export class FacebookAuthService {
    constructor (
        private readonly loadFacebookUser: LoadFacebookUser
    ) { }

    async execute (params: FacebookAuth.Params): Promise<void> {
        await this.loadFacebookUser.loadUser(params)
    }
}
