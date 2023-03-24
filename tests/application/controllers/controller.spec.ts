import { Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { ValidatorComposite } from '@/application/validation'

jest.mock('@/application/validation/validator-composite')

class ControllerStub extends Controller {
    result = {
        statusCode: 200,
        data: 'any_data'
    }

    async execute (httpRequest: any): Promise<HttpResponse> {
        return this.result
    }
}

describe('Controller', () => {
    let sut: ControllerStub

    beforeEach(() => {
        sut = new ControllerStub()
    })

    it('should return 400 if validation fails', async () => {
        const error = new Error('validation_error')
        const ValidatorCompositeSpy = jest.fn().mockImplementationOnce(() => ({
            validate: jest.fn().mockReturnValueOnce(error)
        }))

        jest.mocked(ValidatorComposite).mockImplementationOnce(ValidatorCompositeSpy)

        const httpResponse = await sut.handle('any_value')

        expect(ValidatorCompositeSpy).toHaveBeenCalledWith([])
        expect(httpResponse).toEqual({
            statusCode: 400,
            data: error
        })
    })

    it('should return 500 if execute throws', async () => {
        jest.spyOn(sut, 'execute').mockRejectedValueOnce(new Error('execute_error'))

        const httpResponse = await sut.handle('any_value')

        expect(httpResponse).toEqual({
            statusCode: 500,
            data: new ServerError(new Error('execute_error'))
        })
    })

    it('should return 500 if execute throws a non error object', async () => {
        jest.spyOn(sut, 'execute').mockRejectedValueOnce('error')

        const httpResponse = await sut.handle('any_value')

        expect(httpResponse).toEqual({
            statusCode: 500,
            data: new ServerError()
        })
    })

    it('should return 200 on success', async () => {
        const httpResponse = await sut.handle('any_value')

        expect(httpResponse).toEqual(sut.result)
    })
})
