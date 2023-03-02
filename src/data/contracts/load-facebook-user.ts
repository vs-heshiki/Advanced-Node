export interface LoadFacebookUser {
    loadUser: (params: LoadFacebookUser.Params) => Promise<void>
}

export namespace LoadFacebookUser {
    export type Params = {
        token: string
    }

    export type Resolve = undefined
}
