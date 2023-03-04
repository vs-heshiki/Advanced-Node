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

export interface CreateUserFacebookRepository {
    createWithFacebook: (params: CreateUserFacebookRepository.Params) => Promise<void>
}

export namespace CreateUserFacebookRepository {
    export type Params = {
        email: string
        name: string
        facebookId: string
    }
}

export interface UpdateUserFacebookRepository {
    updateWithFacebook: (params: UpdateUserFacebookRepository.Params) => Promise<void>
}

export namespace UpdateUserFacebookRepository {
    export type Params = {
        id: string
        name: string
        facebookId: string
    }
}
