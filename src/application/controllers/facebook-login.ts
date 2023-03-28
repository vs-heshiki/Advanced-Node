import { Controller } from '@/application/controllers/controller'
import { HttpResponse, success, unauthorized } from '@/application/helpers'
import { Validator, ValidatorBuilder } from '@/application/validation'
import { FacebookAuth } from '@/domain/services'

type Model = Error | { accessToken: string }
type HttpRequest = { token: string }

export class FacebookLoginController extends Controller {
    constructor (private readonly facebookAuth: FacebookAuth) {
        super()
    }

    async execute ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
        try {
            const accessToken = await this.facebookAuth({ token })
            return success(accessToken)
        } catch (err) {
            return unauthorized()
        }
    }

    override validatorBuilder ({ token }: HttpRequest): Validator[] {
        return [
            ...ValidatorBuilder.of({ value: token, input: 'token' }).required().build()
        ]
    }
}
