import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
    async run() {
        // Write your database queries inside the run method
        await User.createMany([
            {
                username: 'user1',
                password: '123456',
                fullName: 'user1 user1',
            },
            {
                username: 'user2',
                password: '123456',
                fullName: 'user2 user2',
            },
            {
                username: 'user3',
                password: '123456',
                fullName: 'user3 user3',
            },
        ])
    }
}
