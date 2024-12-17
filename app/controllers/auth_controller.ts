import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { authValidator } from '#validators/auth'

export default class AuthController {
    public async signIn({ request, response }: HttpContext) {
        try {
            const validatedData = await authValidator.signIn.validate(request.only(['username', 'password']))
            const verify = await User.verifyCredentials(
                validatedData.username,
                validatedData.password,
            )
            if (verify) {
                const token = await User.accessTokens.create(verify)
                const user = await User.query()
                    .where('id', Number(token.tokenableId))
                    .firstOrFail()
                const serializeData = user.serialize({
                    fields: ['id', 'username'],

                })
                return response.ok(
                    {
                        status: 'success',
                        message: 'ลงชื่อเข้าสู่ระบบสำเร็จ',
                        data: {
                            ...serializeData,
                            token: {
                                accessToken: token.value!.release(),
                                expiresIn: token.expiresAt,
                            }
                        },
                    },
                )
            }
        } catch (error) {
            return response.badRequest(
                {
                    status: 'error',
                    ...error,
                },
            )
        }
    }

    public async signUp({ request, response }: HttpContext) {
        try {
            const data = request.only(['fullName', 'username', 'password'])

            const existingUser = await User.findBy('username', data.username)
            if (existingUser) {
                return response.conflict({
                    status: 'error',
                    message: 'Username already exists. Please use a different one.',
                })
            }

            const user = await User.create(data)
            return response.created({
                status: 'success',
                message: 'User created successfully.',
                data: user,
            })
        } catch (error) {
            return response.internalServerError({
                status: 'error',
                message: 'An unexpected error occurred while creating the user.',
            })
        }
    }

}
