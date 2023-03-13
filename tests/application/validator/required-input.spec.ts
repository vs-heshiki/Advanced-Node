import { RequiredInputError } from '@/application/errors'
import { RequiredInputValidator } from '@/application/validator'

describe('RequiredInputValidator', () => {
    it('should return a RequiredInputError if value is empty', () => {
        const sut = new RequiredInputValidator('', 'any_input')

        const error = sut.validate()

        expect(error).toEqual(new RequiredInputError('any_input'))
    })

    it('should return a RequiredInputError if value is null', () => {
        const sut = new RequiredInputValidator(null as any, 'any_input')

        const error = sut.validate()

        expect(error).toEqual(new RequiredInputError('any_input'))
    })

    it('should return a RequiredInputError if value is undefined', () => {
        const sut = new RequiredInputValidator(undefined as any, 'any_input')

        const error = sut.validate()

        expect(error).toEqual(new RequiredInputError('any_input'))
    })

    it('should return undefined if value is not empty', () => {
        const sut = new RequiredInputValidator('any_value', 'any_input')

        const error = sut.validate()

        expect(error).toBeUndefined()
    })
})
