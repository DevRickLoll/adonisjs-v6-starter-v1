import vine from '@vinejs/vine'

const signIn = vine.compile(
    vine.object({
        username: vine
            .string()
            .regex(/^[a-zA-Z0-9]+$/)
            .minLength(4)
            .maxLength(30),
        password: vine.string().trim().minLength(6),
    }),
)

const signUp = vine.compile(
    vine.object({
        username: vine
            .string()
            .regex(/^[a-zA-Z0-9]+$/)
            .minLength(4)
            .maxLength(30),
        password: vine.string().trim().minLength(6),
        fullName: vine
            .string()
            .trim()
            .maxLength(150)
            .regex(/^[a-zA-Z\u0E00-\u0E7F]+$/)
            .optional(),
    }),
)

export const authValidator = {
    signIn,
    signUp,
}
