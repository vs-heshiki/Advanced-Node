export class ServerError extends Error {
    constructor (error?: unknown) {
        super('Something went wrong :(')
        this.name = 'ServerError'
        this.stack = error as string
    }
}
