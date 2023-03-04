export class AccessToken {
    constructor (private readonly key: string) {
        this.key = key
    }

    static get expirationInMs (): number {
        return 30 * 60 * 1000
    }
}
