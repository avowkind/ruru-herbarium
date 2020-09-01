
// pages/api/graphql.js

import { ApolloServer } from 'apollo-server-micro'
import { MongoClient } from 'mongodb'
import { schema } from '../../apollo/schema'

let db

// await setUpDb(req.db)

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        console.log('create client')
        const dbClient = new MongoClient(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })

        if (!dbClient.isConnected()) {
          console.log('awaiting connection')
          await dbClient.connect()
        }
        db = dbClient.db(process.env.DB_NAME) // database name
        console.log('db connected')
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
      }
    }

    return { db }
  }
})
export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
