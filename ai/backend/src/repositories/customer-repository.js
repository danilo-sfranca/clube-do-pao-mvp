import { all, get, run } from '../database/database.js'

export async function createCustomer({ nome, endereco, whatsapp, quantidade, horarioEntrega }) {
  const result = await run(
    `INSERT INTO clientes (nome, endereco, whatsapp, quantidade, horario_entrega)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, endereco, whatsapp, quantidade, horarioEntrega],
  )

  return get(
    `SELECT id, nome, endereco, whatsapp, quantidade, horario_entrega, status, created_at
     FROM clientes
     WHERE id = ?`,
    [result.id],
  )
}

export async function deleteAllCustomers() {
  const result = await run('DELETE FROM clientes')
  return result.changes
}

export async function countActiveCustomers() {
  const result = await get(
    `SELECT COUNT(*) AS total_customers,
            COALESCE(SUM(quantidade), 0) AS total_production
     FROM clientes
     WHERE status = ?`,
    ['ACTIVE'],
  )

  return result
}

export async function findActiveCustomers() {
  return all(
    `SELECT id, nome, endereco, whatsapp, quantidade, horario_entrega
     FROM clientes
     WHERE status = ?
     ORDER BY horario_entrega ASC, id ASC`,
    ['ACTIVE'],
  )
}
