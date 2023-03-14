import { Validator } from '@/application/validation'

export class ValidatorComposite implements Validator {
    constructor (private readonly validators: Validator[]) { }

    validate (): unknown | undefined {
        for (const validator of this.validators) {
            const error = validator.validate()
            if (error !== undefined) {
                return error
            }
        }
    }
}
