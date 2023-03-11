export class FacebookAuthController {
    async handle (httpRequest: any): Promise<httpResponse> {
        return {
            statusCode: 400,
            data: new Error('Token is required!')
        }
    }
}

export type httpResponse = {
    statusCode: number
    data: any
}
