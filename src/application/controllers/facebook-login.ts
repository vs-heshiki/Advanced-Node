import { FacebookAuth } from '@/domain/features'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: any): Promise<httpResponse> {
        await this.facebookAuth.execute({ token: httpRequest.token })

        return {
            statusCode: 400,
            data: new Error('Token is required!')
        }
    }
}

export type httpResponse = {
    statusCode: number
    data: any
}
