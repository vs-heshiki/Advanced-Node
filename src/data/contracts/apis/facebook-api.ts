export interface LoadFacebookUser {
    loadUser: (params: LoadFacebookUser.Params) => Promise<LoadFacebookUser.Resolve>
}

export namespace LoadFacebookUser {
    export type Params = {
        token: string
    }

    export type Resolve = undefined | {
        name: string
        email: string
        facebookId: string
    }
}
