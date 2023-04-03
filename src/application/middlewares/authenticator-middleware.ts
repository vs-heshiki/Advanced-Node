import { HttpResponse, forbidden, success } from '@/application/helpers'
import { RequiredInputValidator } from '@/application/validation/validators'
import { Authorize } from '@/domain/services'

type HttpRequest = { authorization: string }
type Output = Error | { userId: string }

export class AuthenticatorMiddleware {
    constructor (private readonly authorize: Authorize) { }

    async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Output>> {
        if (!this.validate({ authorization })) return forbidden()
        try {
            const userId = await this.authorize({ token: authorization })
            return success({ userId })
        } catch {
            return forbidden()
        }
    }

    private validate ({ authorization }: HttpRequest): boolean {
        const error = new RequiredInputValidator(authorization, 'authorization').validate()
        return error === undefined
    }
}
