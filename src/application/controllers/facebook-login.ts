import { FacebookAuth } from '@/domain/features'

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

        return {
            statusCode: 401,
            data: resolve
        }
    }
}

export type httpResponse = {
    statusCode: number
    data: any
}
