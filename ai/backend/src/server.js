import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { initializeDatabase } from './database/database.js'
import customerRoutes from './routes/customer-routes.js'
import pcpRoutes from './routes/pcp-routes.js'

const app = express()
const port = Number(process.env.PORT || 3000)

app.use(cors())
app.use(express.json())
app.use('/api', customerRoutes)
app.use('/api', pcpRoutes)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'clube-do-pao-backend' })
})

async function startServer() {
  await initializeDatabase()
  app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Nao foi possivel iniciar o backend:', error)
  process.exit(1)
})
