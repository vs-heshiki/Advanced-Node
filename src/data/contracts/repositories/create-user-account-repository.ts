export interface CreateUserAccountRepository {
    createFromFacebook: (params: CreateUserAccountRepository.Params) => Promise<void>
}

export namespace CreateUserAccountRepository {
    export type Params = {
        email: string
        name: string
        facebookId: string
    }
}
