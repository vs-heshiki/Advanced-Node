import { HttpGetClient } from '@/infra/http'
import { LoadFacebookUser } from '@/domain/contracts/apis'

type AppToken = {
    access_token: string
}

type DebugToken = {
    data: {
        user_id: string
    }
}

type UserInfo = {
    id: string
    name: string
    email: string
}

type Input = LoadFacebookUser.Input
type Output = LoadFacebookUser.Output

export class FacebookApi implements LoadFacebookUser {
    private readonly baseUrl = 'https://graph.facebook.com/v16.0'

    constructor (
        private readonly httpClient: HttpGetClient,
        private readonly clientId: string,
        private readonly clientSecret: string
    ) { }

    async loadUser ({ token }: Input): Promise<Output> {
        return await this.getUserInfo(token)
            .then(({ name, email, id }) => ({ name, email, facebookId: id }))
            .catch(() => (undefined))
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

    private async getDebugToken (token: string): Promise<DebugToken> {
        const appToken = await this.getAppToken()
        return await this.httpClient.get({
            url: `${this.baseUrl}/debug_token`,
            params: {
                input_token: token,
                access_token: appToken.access_token
            }
        })
    }

    private async getUserInfo (token: string): Promise<UserInfo> {
        const debugToken = await this.getDebugToken(token)
        return await this.httpClient.get({
            url: `${this.baseUrl}/${debugToken.data.user_id}`,
            params: {
                fields: ['id', 'name', 'email'].join(','),
                access_token: token
            }
        })
    }
}
