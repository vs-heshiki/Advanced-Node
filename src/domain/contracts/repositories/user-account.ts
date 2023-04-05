export interface LoadUserAccount {
    load: (params: LoadUserAccount.Input) => Promise<LoadUserAccount.Output>
}

export namespace LoadUserAccount {
    export type Input = {
        email: string
    }

    export type Output = undefined | {
        id: string
        name?: string
    }
}

export interface SaveUserFacebook {
    saveWithFacebook: (params: SaveUserFacebook.Input) => Promise<SaveUserFacebook.Output>
}

export namespace SaveUserFacebook {
    export type Input = {
        id?: string
        email: string
        name: string
        facebookId: string
    }

    export type Output = {
        id: string
    }
}
