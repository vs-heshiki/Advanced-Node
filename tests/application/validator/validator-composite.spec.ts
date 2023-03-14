import { Validator, ValidatorComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ValidatorComposite', () => {
    let validator1: MockProxy<Validator>
    let validator2: MockProxy<Validator>
    let validators: Validator[]
    let sut: ValidatorComposite

    beforeAll(() => {
        validator1 = mock()
        validator1.validate.mockReturnValue(undefined)
        validator2 = mock()
        validator2.validate.mockReturnValue(undefined)
        validators = [validator1, validator2]
    })

    beforeEach(() => {
        sut = new ValidatorComposite(validators)
    })

    it('should return undefined if all validators return undefined', () => {
        const error = sut.validate()

        expect(error).toBeUndefined()
    })

    it('should return the first error', () => {
        validator1.validate.mockReturnValueOnce(new Error('first_validator_error'))
        validator2.validate.mockReturnValueOnce(new Error('second_validator_error'))

        const error = sut.validate()

        expect(error).toEqual(new Error('first_validator_error'))
    })
})
