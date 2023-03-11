import { ServerError } from '@/application/errors'

type HttpResponse = {
    statusCode: number
    data: any
}

export const serverError = (error: unknown): HttpResponse => ({
    statusCode: 500,
    data: new ServerError(error)
})
