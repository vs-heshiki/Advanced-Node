export class AccessToken {
    constructor (private readonly key: string) { }

    static get expiresInMs (): number {
        return 30 * 60 * 1000
    }
}
