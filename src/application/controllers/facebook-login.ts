import { RequiredInputError } from '@/application/errors'
import { HttpResponse, badRequest, serverError, success, unauthorized } from '@/application/helpers'
import { RequiredInputValidator } from '@/application/validatior'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const validate = this.validate(httpRequest)
            if (validate !== undefined) {
                return badRequest(new RequiredInputError('token'))
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

    private validate (httpRequest: HttpRequest): unknown | undefined {
        const validator = new RequiredInputValidator(httpRequest.token, 'token')
        return validator.validate()
    }
}

type Model = unknown | {
    accessToken: string
}

type HttpRequest = {
    token: string
}
