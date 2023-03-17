import { Controller } from '@/application/controllers/controller'
import { HttpResponse, success, unauthorized } from '@/application/helpers'
import { Validator, ValidatorBuilder } from '@/application/validation'
import { FacebookAuth } from '@/domain/features'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController extends Controller {
    constructor (private readonly facebookAuth: FacebookAuth) {
        super()
    }

    async execute (httpRequest: any): Promise<HttpResponse<Model>> {
        const accessToken = await this.facebookAuth.execute({ token: httpRequest.token })

        return accessToken instanceof AccessToken
            ? success({ accessToken: accessToken.key })
            : unauthorized()
    }

    override validatorBuilder (httpRequest: HttpRequest): Validator[] {
        return [
            ...ValidatorBuilder.of({ value: httpRequest.token, input: 'token' }).required().build()
        ]
    }
}

type Model = unknown | {
    accessToken: string
}

type HttpRequest = {
    token: string
}
