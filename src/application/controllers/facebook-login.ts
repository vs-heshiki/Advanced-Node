import { FieldRequiredError } from '@/application/errors'
import { badRequest, serverError, success, unauthorized } from '@/application/helpers'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: any): Promise<httpResponse> {
        try {
            if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
                return badRequest(new FieldRequiredError('token'))
            }

            const resolve = await this.facebookAuth.execute({ token: httpRequest.token })

            if (resolve instanceof AccessToken) {
                return success({
                    accessToken: resolve.key
                })
            } else {
                return unauthorized()
            }
        } catch (err) {
            return serverError(err)
        }
    }
}

export type httpResponse = {
    statusCode: number
    data: any
}
