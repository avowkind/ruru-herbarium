import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export async function setUpDb (db) {
  console.time('startdb')
  db.collection('tokens')
    .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 })
  db.collection('posts').createIndex({ createdAt: -1 })
  db.collection('users').createIndex({ email: 1 }, { unique: true })
  console.timeEnd('startdb')
}

export default async function database (req, res, next) {
  console.log('database.js connecting')
  try {
    await client.connect()
  } catch (err) {
    console.log('database.js error', err)
    return next(err)
  }
  req.dbClient = client
  req.db = client.db(process.env.DB_NAME)
  await setUpDb(req.db)
  return next()
}
