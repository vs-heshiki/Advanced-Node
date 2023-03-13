import { RequiredInputError } from '@/application/errors'

export class RequiredInputValidator {
    constructor (
        private readonly value: string,
        private readonly input: string
    ) { }

    validate (): unknown | undefined {
        if (this.value === '' || this.value === undefined || this.value === null) {
            return new RequiredInputError(this.input)
        }
    }
}
