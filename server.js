import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
app.use(cors())
app.use(express.json())

// Initialisation de la base de données
async function initDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

// Routes de base
app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur Immodenface API' })
})

const PORT = 3000
app.listen(PORT, async () => {
  const db = await initDb()
  await db.migrate({
    migrationsPath: './migrations'
  })
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
