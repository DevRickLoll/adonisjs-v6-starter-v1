/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { CONTANTS } from '#config/contants'
import AuthController from '#controllers/auth_controller'


router
    .group(() => {
        router.post('/sign-in', [AuthController, 'signIn'])
        router.post('/sign-up', [AuthController, 'signUp'])
    })
    .prefix(CONTANTS.API.V1)

