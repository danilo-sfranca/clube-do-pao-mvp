import { Router } from 'express'
import { registerCustomer } from '../controllers/customer-controller.js'

const customerRoutes = Router()

customerRoutes.post('/clientes', registerCustomer)

export default customerRoutes
