import fs from 'node:fs/promises'
import path from 'node:path'
import sqlite3 from 'sqlite3'
import { databasePath } from '../config/database-config.js'

const sqlite = sqlite3.verbose()
let database

export async function initializeDatabase() {
  await fs.mkdir(path.dirname(databasePath), { recursive: true })

  database = new sqlite.Database(databasePath)
  await run('PRAGMA foreign_keys = ON')
  await run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      endereco TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export function run(sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.run(sql, parameters, function onRun(error) {
      if (error) {
        reject(error)
        return
      }

      resolve({ id: this.lastID, changes: this.changes })
    })
  })
}

export function get(sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.get(sql, parameters, (error, row) => {
      if (error) {
        reject(error)
        return
      }

      resolve(row)
    })
  })
}

export function all(sql, parameters = []) {
  return new Promise((resolve, reject) => {
    database.all(sql, parameters, (error, rows) => {
      if (error) {
        reject(error)
        return
      }

      resolve(rows)
    })
  })
}
