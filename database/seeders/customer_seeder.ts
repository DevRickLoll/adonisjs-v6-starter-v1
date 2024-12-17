import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { CustomerFactory } from '#database/factories/customer_factory'

export default class extends BaseSeeder {
    async run() {
        // Write your database queries inside the run method
        await CustomerFactory.createMany(1000)
    }
}
