import nextConnect from 'next-connect'
import database from './database'
import session from './session'
import passport from '../lib/passport'

const middleware = nextConnect()

/** include handler.use(middleware)
 * if controller needs a session, user and database
 * otherwise use just the specific items
 */
middleware
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session())

export default middleware
