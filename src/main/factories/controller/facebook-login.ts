import { FacebookLoginController } from '@/application/controllers'
import { newFacebookAuthService } from '@/main/factories/services'

export const newFacebookLoginController = (): FacebookLoginController => {
    return new FacebookLoginController(newFacebookAuthService())
}
