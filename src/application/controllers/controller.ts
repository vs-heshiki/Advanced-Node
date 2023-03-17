import { HttpResponse, badRequest, serverError } from '@/application/helpers'
import { Validator, ValidatorComposite } from '@/application/validation'

export abstract class Controller {
    abstract execute (httpRequest: any): Promise<HttpResponse>

    validatorBuilder (httpRequest: any): Validator[] {
        return []
    }

    async handle (httpRequest: any): Promise<HttpResponse> {
        const error = this.validate(httpRequest)
        if (error !== undefined) {
            return badRequest(error)
        }

        try {
            return await this.execute(httpRequest)
        } catch (err) {
            return serverError(err)
        }
    }

    private validate (httpRequest: any): unknown | undefined {
        const validators = this.validatorBuilder(httpRequest)
        return new ValidatorComposite(validators).validate()
    }
}
