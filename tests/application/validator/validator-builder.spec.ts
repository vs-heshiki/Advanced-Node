import { ValidatorBuilder } from '@/application/validation'
import { RequiredInputValidator } from '@/application/validation/validators'

describe('ValidatorBuilder', () => {
    it('should return RequiredInputValidator', () => {
        const validators = ValidatorBuilder.of({ value: 'any_value', input: 'any_input' }).required().build()

        expect(validators).toEqual([new RequiredInputValidator('any_value', 'any_input')])
    })
})
