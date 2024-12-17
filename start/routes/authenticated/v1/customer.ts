import router from '@adonisjs/core/services/router'
import CustomersController from '#controllers/customers_controller'
import { CONTANTS } from '#config/contants'
import {middleware} from "#start/kernel";

const baseRoute = '/customer'
router
    .group(() => {
        router.get(`${baseRoute}s`, [CustomersController, 'index'])
        router.get(`${baseRoute}/:id`, [CustomersController, 'show'])
        router.post(`${baseRoute}`, [CustomersController, 'store'])
        router.put(`${baseRoute}/:id`, [CustomersController, 'update'])
        router.delete(`${baseRoute}/:id`, [CustomersController, 'destroy'])
    })
    .prefix(CONTANTS.API.V1)
    .use([middleware.auth()])
    .where('id', /^[0-9]+$/)
