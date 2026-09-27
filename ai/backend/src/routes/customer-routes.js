import { Router } from 'express'
import { deleteCustomers, registerCustomer } from '../controllers/customer-controller.js'

const customerRoutes = Router()

customerRoutes.post('/clientes', registerCustomer)
customerRoutes.delete('/clientes', deleteCustomers)

export default customerRoutes
