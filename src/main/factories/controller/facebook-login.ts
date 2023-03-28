import { FacebookLoginController } from '@/application/controllers'
import { newFacebookAuth } from '@/main/factories/services'

export const newFacebookLoginController = (): FacebookLoginController => {
    return new FacebookLoginController(newFacebookAuth())
}
