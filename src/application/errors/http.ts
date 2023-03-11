export class ServerError extends Error {
    constructor (error?: unknown) {
        super('Something went wrong! Try again later :(')
        this.name = 'ServerError'
        this.stack = error as string
    }
}

export class UnauthorizedError extends Error {
    constructor () {
        super('Unauthorized!')
        this.name = 'Unauthorized'
    }
}
