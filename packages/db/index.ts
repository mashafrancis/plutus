import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { fieldEncryptionExtension } from 'prisma-field-encryption'
import { env } from './env'

declare global {
  var cachedPrisma: PrismaClient
}

const libsql = createClient({
  url: 'libsql://plutus-mashafrancis.turso.io',
  authToken: env.TURSO_AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(libsql)

let client: PrismaClient
if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient({ adapter })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter })
  }
  client = global.cachedPrisma
}

const prismaClient = client

export default prismaClient
