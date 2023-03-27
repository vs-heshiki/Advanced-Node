import { AuthenticatorError } from '@/domain/services/errors'
import { AccessToken } from '@/domain/models'

export interface FacebookAuth {
    execute: (params: FacebookAuth.Params) => Promise<FacebookAuth.Resolve>
}

export namespace FacebookAuth {
    export type Params = {
        token: string
    }

    export type Resolve = AccessToken | AuthenticatorError
}
