import { ServerError, UnauthorizedError } from '@/application/errors'

export type HttpResponse<T = any> = {
    statusCode: number
    data: T
}

export const success = <T = any> (data: T): HttpResponse<T> => ({
    statusCode: 200,
    data
})

export const serverError = (error: unknown): HttpResponse<unknown> => ({
    statusCode: 500,
    data: new ServerError(error)
})

export const unauthorized = (): HttpResponse<unknown> => ({
    statusCode: 401,
    data: new UnauthorizedError()
})

export const badRequest = (error: unknown): HttpResponse<unknown> => ({
    statusCode: 400,
    data: error
})
