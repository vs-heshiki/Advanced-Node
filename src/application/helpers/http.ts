import { ServerError, UnauthorizedError } from '@/application/errors'

type HttpResponse = {
    statusCode: number
    data: any
}

export const success = (data: any): HttpResponse => ({
    statusCode: 200,
    data
})

export const serverError = (error: unknown): HttpResponse => ({
    statusCode: 500,
    data: new ServerError(error)
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    data: new UnauthorizedError()
})

export const badRequest = (error: unknown): HttpResponse => ({
    statusCode: 400,
    data: error
})
