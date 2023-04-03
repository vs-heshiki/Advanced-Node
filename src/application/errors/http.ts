export class ServerError extends Error {
    constructor (error?: Error) {
        super('Something went wrong! Try again later :(')
        this.name = 'ServerError'
        this.stack = error?.stack
    }
}

export class UnauthorizedError extends Error {
    constructor () {
        super('Unauthorized!')
        this.name = 'Unauthorized'
    }
}

export class RequiredInputError extends Error {
    constructor (input: string) {
        super(`Input ${input} is required!`)
        this.name = 'RequiredInputError'
    }
}

export class ForbiddenError extends Error {
    constructor () {
        super('Access Denied!')
        this.name = 'ForbiddenError'
    }
}
