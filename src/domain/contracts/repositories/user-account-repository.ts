export interface LoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Resolve>
}

export namespace LoadUserAccountRepository {
    export type Params = {
        email: string
    }

    export type Resolve = undefined | {
        id: string
        name?: string
    }
}

export interface SaveUserFacebookRepository {
    saveWithFacebook: (params: SaveUserFacebookRepository.Params) => Promise<SaveUserFacebookRepository.Resolve>
}

export namespace SaveUserFacebookRepository {
    export type Params = {
        id?: string
        email: string
        name: string
        facebookId: string
    }

    export type Resolve = {
        id: string
    }
}
