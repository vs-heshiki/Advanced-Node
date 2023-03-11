export class AccessToken {
    constructor (readonly key: string) { }

    static get expiresInMs (): number {
        return 30 * 60 * 1000
    }
}
