import vine from '@vinejs/vine'

const create = vine.compile(
    vine.object({
        firstName: vine.string().trim().minLength(2).maxLength(70),
        lastName: vine.string().trim().minLength(2).maxLength(70),
    }),
)

const update = vine.compile(
    vine.object({
        firstName: vine.string().trim().minLength(2).maxLength(70).optional(),
        lastName: vine.string().trim().minLength(2).maxLength(70).optional(),
    }),
)

export const customerValidator = {
    create,
    update,
}
