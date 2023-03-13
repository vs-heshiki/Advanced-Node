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
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const error = sut.validate()

        expect(error).toBeUndefined()
    })
})
