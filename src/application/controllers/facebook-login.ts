import { FieldRequiredError } from '@/application/errors'
import { HttpResponse, badRequest, serverError, success, unauthorized } from '@/application/helpers'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
                return badRequest(new FieldRequiredError('token'))
            }

            const accessToken = await this.facebookAuth.execute({ token: httpRequest.token })

            if (accessToken instanceof AccessToken) {
                return success({
                    accessToken: accessToken.key
                })
            } else {
                return unauthorized()
            }
        } catch (err) {
            return serverError(err)
        }
    }
}

type Model = unknown | {
    accessToken: string
}

type HttpRequest = {
    token: string | undefined | null
}
