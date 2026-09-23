import { all, get, run } from '../database/database.js'

export async function createCustomer({ nome, endereco, whatsapp }) {
  const result = await run(
    `INSERT INTO clientes (nome, endereco, whatsapp)
     VALUES (?, ?, ?)`,
    [nome, endereco, whatsapp],
  )

  return get(
    `SELECT id, nome, endereco, whatsapp, status, created_at
     FROM clientes
     WHERE id = ?`,
    [result.id],
  )
}

export async function countActiveCustomers() {
  const result = await get(
    `SELECT COUNT(*) AS total
     FROM clientes
     WHERE status = ?`,
    ['ACTIVE'],
  )

  return result.total
}

export async function findActiveCustomers() {
  return all(
    `SELECT id, nome, whatsapp
     FROM clientes
     WHERE status = ?
     ORDER BY id`,
    ['ACTIVE'],
  )
}
