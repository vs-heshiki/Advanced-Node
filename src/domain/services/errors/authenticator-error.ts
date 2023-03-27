export class AuthenticatorError extends Error {
    constructor () {
        super('Authenticate failed')
    }
}
