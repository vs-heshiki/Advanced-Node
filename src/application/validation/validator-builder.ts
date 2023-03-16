import { Validator } from '@/application/validation/validator'
import { RequiredInputValidator } from '@/application/validation/validators'

export class ValidatorBuilder {
    private constructor (
        private readonly value: string,
        private readonly input: string,
        private readonly validators: Validator[] = []
    ) { }

    static of (params: { value: string, input: string }): ValidatorBuilder {
        return new ValidatorBuilder(params.value, params.input)
    }

    required (): ValidatorBuilder {
        this.validators.push(new RequiredInputValidator(this.value, this.input))
        return this
    }

    build (): Validator[] {
        return this.validators
    }
}
