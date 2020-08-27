import nextConnect from 'next-connect'
import config from '../../lib/config'
const handler = nextConnect()

// handler.use(middleware)
handler.get(async (req, res) => {
  res.send(config)
})

export default handler
