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
  if (!client.isConnected()) {
    console.time('mongoConnect')
    await client.connect()
    console.timeEnd('mongoConnect')
  } else {
    console.log('mongo still connected')
  }

  req.dbClient = client
  req.db = client.db(process.env.DB_NAME)
  await setUpDb(req.db)
  return next()
}
