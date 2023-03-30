import { TokenValidator } from '@/domain/contracts/crypto/token-validator'

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Output = string
export type Authorize = (params: Input) => Promise<Output>

export const AuthorizeSetup: Setup = (crypto) => async params => {
    return await crypto.validate(params)
}
