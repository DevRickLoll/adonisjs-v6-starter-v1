import Customer from '#models/customer'
import { HttpContext } from '@adonisjs/core/http'
import { customerValidator } from '#validators/customer'

export default class CustomersController {
    // ดึงข้อมูลลูกค้าพร้อม Pagination และ Search
    async index({ request, response }: HttpContext) {
        try {
            const search = request.input('search', '') // คำที่ต้องการค้นหา
            const page = request.input('page', 1) // หน้าที่แสดง (default: 1)
            const limit = request.input('limit', 10) // จำนวนข้อมูลต่อหน้า (default: 10)

            const customers = await Customer.query()
                .where((query) => {
                    if (search) {
                        query
                            .where('first_name', 'ilike', `%${search}%`)
                            .orWhere('last_name', 'ilike', `%${search}%`)
                    }
                })
                .paginate(page, limit)

            return response.ok(customers)
        } catch (error) {
            return response.internalServerError({ message: 'Failed to fetch customers', error })
        }
    }

    // สร้างลูกค้าใหม่
    async store({ request, response }: HttpContext) {
        try {
            const validateData = await customerValidator.create.validate(
                request.only(['firstName', 'lastName']),
            )
            const customer = await Customer.create(validateData)
            return response.created(customer)
        } catch (error) {
            return response.badRequest({ message: 'Failed to create customer.ts', error })
        }
    }

    // ดึงข้อมูลลูกค้าตาม ID
    async show({ params, response }: HttpContext) {
        try {
            const customer = await Customer.findOrFail(params.id)
            return response.ok(customer)
        } catch (error) {
            return response.notFound({ message: 'Customer not found', error })
        }
    }

    // อัปเดตข้อมูลลูกค้า
    async update({ params, request, response }: HttpContext) {
        try {
            const customer = await Customer.findOrFail(params.id)
            const validateData = await customerValidator.update.validate(
                request.only(['firstName', 'lastName']),
            )
            customer.merge(validateData)
            await customer.save()
            return response.ok(customer)
        } catch (error) {
            return response.badRequest({ message: 'Failed to update customer.ts', error })
        }
    }

    // ลบข้อมูลลูกค้า
    async destroy({ params, response }: HttpContext) {
        try {
            const customer = await Customer.findOrFail(params.id)
            await customer.delete()
            return response.noContent()
        } catch (error) {
            return response.badRequest({ message: 'Failed to delete customer.ts', error })
        }
    }
}
