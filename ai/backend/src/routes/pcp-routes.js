import { Router } from 'express'
import { dispatchRoute, getDeliveryRoute, getProductionDemand } from '../controllers/pcp-controller.js'

const pcpRoutes = Router()

pcpRoutes.get('/pcp/demanda', getProductionDemand)
pcpRoutes.get('/pcp/rota', getDeliveryRoute)
pcpRoutes.post('/pcp/despacho', dispatchRoute)

export default pcpRoutes
