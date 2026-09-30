import assert from 'node:assert/strict'
import test from 'node:test'

process.env.DATABASE_PATH = './data/test-clube-do-pao.db'

const { app } = await import('../server.js')
const { initializeDatabase } = await import('../database/database.js')
const { deleteAllCustomers } = await import('../repositories/customer-repository.js')

test.beforeEach(async () => {
  await initializeDatabase()
  await deleteAllCustomers()
})

test.after(async () => {
  await deleteAllCustomers()
})

test('GET /api/health returns service status', async () => {
  const server = app.listen(0)

  try {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}/api/health`)
    const payload = await response.json()

    assert.equal(response.status, 200)
    assert.equal(payload.status, 'ok')
    assert.equal(payload.service, 'clube-do-pao-backend')
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
})

test('POST /api/clientes registers a customer when data is valid', async () => {
  const server = app.listen(0)

  try {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}/api/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Maria Silva',
        endereco: 'Rua das Flores, 120',
        whatsapp: '(11) 98888-1234',
        quantidade: 4,
        horario_entrega: '06:00-06:30',
      }),
    })

    const payload = await response.json()
    assert.equal(response.status, 201)
    assert.equal(payload.cliente.nome, 'Maria Silva')
    assert.equal(payload.cliente.quantidade, 4)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
})

test('GET /api/pcp/demanda returns the active customer count and total production', async () => {
  const server = app.listen(0)

  try {
    const { port } = server.address()
    await fetch(`http://127.0.0.1:${port}/api/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Pedro Almeida',
        endereco: 'Av. Central, 78',
        whatsapp: '(11) 97777-4321',
        quantidade: 2,
        horario_entrega: '05:30-06:00',
      }),
    })

    const response = await fetch(`http://127.0.0.1:${port}/api/pcp/demanda`)
    const payload = await response.json()

    assert.equal(response.status, 200)
    assert.equal(payload.total_customers, 1)
    assert.equal(payload.total_production, 2)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
})
