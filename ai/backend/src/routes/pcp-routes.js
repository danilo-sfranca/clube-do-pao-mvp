import { Router } from 'express'
import { dispatchRoute, getProductionDemand } from '../controllers/pcp-controller.js'

const pcpRoutes = Router()

pcpRoutes.get('/pcp/demanda', getProductionDemand)
pcpRoutes.post('/pcp/despacho', dispatchRoute)

export default pcpRoutes
