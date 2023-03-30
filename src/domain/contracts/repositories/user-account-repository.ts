export interface LoadUserAccountRepository {
    load: (params: LoadUserAccountRepository.Input) => Promise<LoadUserAccountRepository.Output>
}

export namespace LoadUserAccountRepository {
    export type Input = {
        email: string
    }

    export type Output = undefined | {
        id: string
        name?: string
    }
}

export interface SaveUserFacebookRepository {
    saveWithFacebook: (params: SaveUserFacebookRepository.Input) => Promise<SaveUserFacebookRepository.Output>
}

export namespace SaveUserFacebookRepository {
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
