import { HttpGetClient } from '@/infra/http'
import { LoadFacebookUser } from '@/data/contracts/apis'

export class FacebookApi {
    private readonly baseUrl = 'https://graph.facebook.com'

    constructor (
        private readonly httpClient: HttpGetClient,
        private readonly clientId: string,
        private readonly clientSecret: string
    ) { }

    async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Resolve> {
        const appToken = await this.httpClient.get({
            url: `${this.baseUrl}/oauth/access_token`,
            params: {
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                grantType: 'client_credentials'
            }
        })

        const debugToken = await this.httpClient.get({
            url: `${this.baseUrl}/debug_token`,
            params: {
                accessToken: appToken.accessToken,
                inputToken: params.token
            }
        })

        const facebookUser = await this.httpClient.get({
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            url: `${this.baseUrl}/${debugToken.data.userId}`,
            params: {
                fields: ['id', 'name', 'email'].join(','),
                accessToken: params.token
            }
        })

        return {
            name: facebookUser.name,
            email: facebookUser.email,
            facebookId: facebookUser.id
        }
    }
}
