import { HttpGetClient } from '@/infra/http'
import { LoadFacebookUser } from '@/data/contracts/apis'

export class FacebookApi {
    private readonly baseUrl = 'https://graph.facebook.com'

    constructor (
        private readonly httpClient: HttpGetClient,
        private readonly clientId: string,
        private readonly clientSecret: string
    ) { }

    async loadUser (params: LoadFacebookUser.Params): Promise<void> {
        await this.httpClient.get({
            url: `${this.baseUrl}/oauth/access_token`,
            params: {
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                grantType: 'client_credentials'
            }
        })
    }
}
