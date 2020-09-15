import nextConnect from 'next-connect'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import middleware from '../../../middlewares/middleware'
import { extractUser } from '../../../lib/api-helpers'
import { ObjectID } from 'mongodb'

const upload = multer({ dest: '/tmp' })
const handler = nextConnect()

/* eslint-disable camelcase */
const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret
} = new URL(process.env.CLOUDINARY_URL)

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
})

handler.use(middleware)

handler.get(async (req, res) => res.json({ user: extractUser(req) }))

handler.post(upload.single('file'), async (req, res) => {
  console.log('post picture', req.file)
  if (!req.user) {
    res.status(401).end()
    return
  }
  if (!req.file) {
    res.status(400).end('file required') // bad request
    return
  }
  const { _id, collection } = req.body
  if (!['users', 'plants', 'species'].includes(collection)) {
    res.status(400).end('invalid collection') // bad request
    return
  }
  if (!_id) {
    res.status(400).end('invalid id') // bad request
    return
  }
  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 512,
    height: 512,
    crop: 'fill'
  })
  const picture = image.secure_url
  console.log(picture)
  if (!picture) {
    res.status(400).end('failed to save picture') // bad request
    return
  }
  await req.db.collection(collection).updateOne(
    { _id: ObjectID(_id) },
    {
      $set: {
        imageUrl: picture
      }
    }
  )
  res.json({ ok: true, picture })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
