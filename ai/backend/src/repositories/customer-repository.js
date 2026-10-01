import { getDatabaseConnection } from '../database/database.js'

const database = getDatabaseConnection()

async function ensureDatabaseReady() {
  if (!database.database) {
    await database.initialize()
  }
}

export async function createCustomer({ nome, endereco, whatsapp, quantidade, horarioEntrega }) {
  await ensureDatabaseReady()

  const result = await database.run(
    `INSERT INTO clientes (nome, endereco, whatsapp, quantidade, horario_entrega)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, endereco, whatsapp, quantidade, horarioEntrega],
  )

  return database.get(
    `SELECT id, nome, endereco, whatsapp, quantidade, horario_entrega, status, created_at
     FROM clientes
     WHERE id = ?`,
    [result.id],
  )
}

export async function deleteAllCustomers() {
  await ensureDatabaseReady()

  const result = await database.run('DELETE FROM clientes')
  return result.changes
}

export async function countActiveCustomers() {
  await ensureDatabaseReady()

  const result = await database.get(
    `SELECT COUNT(*) AS total_customers,
            COALESCE(SUM(quantidade), 0) AS total_production
     FROM clientes
     WHERE status = ?`,
    ['ACTIVE'],
  )

  return result
}

export async function findActiveCustomers() {
  await ensureDatabaseReady()

  return database.all(
    `SELECT id, nome, endereco, whatsapp, quantidade, horario_entrega
     FROM clientes
     WHERE status = ?
     ORDER BY horario_entrega ASC, id ASC`,
    ['ACTIVE'],
  )
}
