import { HttpResponse, badRequest, serverError, success, unauthorized } from '@/application/helpers'
import { ValidatorComposite } from '@/application/validation'
import { RequiredInputValidator } from '@/application/validation/validators'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
    constructor (private readonly facebookAuth: FacebookAuth) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const error = this.validate(httpRequest)
            if (error !== undefined) {
                return badRequest(error)
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
        return new ValidatorComposite([
            new RequiredInputValidator(httpRequest.token, 'token')
        ]).validate()
    }
}

type Model = unknown | {
    accessToken: string
}

type HttpRequest = {
    token: string
}
