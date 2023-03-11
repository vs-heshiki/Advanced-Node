import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: any): Promise<httpResponse> {
        if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
            return {
                statusCode: 400,
                data: new Error('Token is required!')
            }
        }

        const resolve = await this.facebookAuth.execute({ token: httpRequest.token })

        if (resolve instanceof AccessToken) {
            return {
                statusCode: 200,
                data: {
                    accessToken: resolve.key
                }
            }
        } else {
            return {
                statusCode: 401,
                data: resolve
            }
        }
    }
}

export type httpResponse = {
    statusCode: number
    data: any
}
