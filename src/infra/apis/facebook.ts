import { HttpGetClient } from '@/infra/http'
import { LoadFacebookUser } from '@/data/contracts/apis'

type AppToken = {
    accessToken: string
}

type DebugToken = {
    data: {
        userId: string
    }
}

type UserInfo = {
    id: string
    name: string
    email: string
}

export class FacebookApi implements LoadFacebookUser {
    private readonly baseUrl = 'https://graph.facebook.com'

    constructor (
        private readonly httpClient: HttpGetClient,
        private readonly clientId: string,
        private readonly clientSecret: string
    ) { }

    async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Resolve> {
        return await this.getUserInfo(params.token).then(({ name, email, id }) => ({
            name,
            email,
            facebookId: id
        })).catch(() => (undefined))
    }

    private async getAppToken (): Promise<AppToken> {
        return await this.httpClient.get({
            url: `${this.baseUrl}/oauth/access_token`,
            params: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'client_credentials'
            }
        })
    }

    private async getDebugToken (clientToken: string): Promise<DebugToken> {
        const appToken = await this.getAppToken()
        return await this.httpClient.get({
            url: `${this.baseUrl}/debug_token`,
            params: {
                access_token: appToken.accessToken,
                input_token: clientToken
            }
        })
    }

    private async getUserInfo (clientToken: string): Promise<UserInfo> {
        const debugToken = await this.getDebugToken(clientToken)
        return await this.httpClient.get({
            url: `${this.baseUrl}/${debugToken.data.userId}`,
            params: {
                fields: ['id', 'name', 'email'].join(','),
                access_token: clientToken
            }
        })
    }
}
