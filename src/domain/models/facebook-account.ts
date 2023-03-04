
export type FacebookData = {
    name: string
    email: string
    facebookId: string
}

export type AccountData = {
    id?: string
    name?: string
}

export class FacebookAccount {
    id?: string
    name: string
    email: string
    facebookId: string

    constructor (fbData: FacebookData, accData?: AccountData) {
        this.id = accData?.id
        this.name = accData?.name ?? fbData.name
        this.email = fbData.email
        this.facebookId = fbData.facebookId
    }
}
