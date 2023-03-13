import { Validator } from '@/application/validation'

export class ValidatorComposite {
    constructor (private readonly validators: Validator[]) { }

    validate (): undefined {
        return undefined
    }
}
