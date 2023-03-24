import { Controller } from '@/application/controllers/controller'
import { HttpResponse, success, unauthorized } from '@/application/helpers'
import { Validator, ValidatorBuilder } from '@/application/validation'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController extends Controller {
    constructor (private readonly facebookAuth: FacebookAuth) {
        super()
    }

    async execute ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
        const accessToken = await this.facebookAuth.execute({ token })

        return accessToken instanceof AccessToken
            ? success({ accessToken: accessToken.key })
            : unauthorized()
    }

    override validatorBuilder ({ token }: HttpRequest): Validator[] {
        return [
            ...ValidatorBuilder.of({ value: token, input: 'token' }).required().build()
        ]
    }
}

type Model = Error | {
    accessToken: string
}

type HttpRequest = {
    token: string
}
