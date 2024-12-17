import factory from '@adonisjs/lucid/factories'
import Customer from '#models/customer'

export const CustomerFactory = factory
    .define(Customer, async ({ faker }) => {
        return {
            firstName: faker.person.firstName(), // เปลี่ยนจาก findName เป็น fullName
            lastName: faker.person.lastName(),
        }
    })
    .build()
