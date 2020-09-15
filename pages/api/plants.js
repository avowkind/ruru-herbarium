import nextConnect from 'next-connect'
import middleware from '../../middlewares/middleware'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'

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

handler.get(async (req, res) => {
  const plants = await req.db
    .collection('plants')
    .find({})
    // .sort({ name })
    .toArray()
  res.send(plants)
})

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated')
  }

  const plants = req.body
  if (!plants) return res.status(400).send('You must write something')

  const sp = {
    ...plants,
    createdAt: new Date(),
    creatorId: req.user._id
  }

  await req.db.collection('plants').insertOne(sp)
  return res.send(sp)
})

handler.patch(upload.single('imageUrl'), async (req, res) => {
  if (!req.user) {
    res.status(401).end()
    return
  }
  let imageUrl
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill'
    })
    imageUrl = image.secure_url
  }
  const plants = req.body
  await req.db.collection('plants').updateOne(
    { _id: req.user._id },
    {
      $set: {
        ...plants,
        ...(imageUrl && { imageUrl })
      }
    }
  )

  const sp = await req.db
    .collection('plants')
    .find({})
    // .sort({ name })
    .toArray()
  res.send(sp)
})

export default handler
