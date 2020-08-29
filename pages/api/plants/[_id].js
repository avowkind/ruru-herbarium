
import nextConnect from 'next-connect'
import middleware from '../../../middlewares/middleware'
import { ObjectID } from 'mongodb'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    const sp = await req.db
      .collection('plants')
      .findOne(ObjectID(req.query._id))
    console.log(sp)
    if (!sp) { res.status(404).json({}) } else { res.json(sp) }
  } catch (e) {
    console.log('error', e)
    res.status(500).json(e)
  }
})

handler.patch(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated')
  }

  const plant = req.body
  console.log('put')
  if (!plant) return res.status(400).send('empty body')
  let imageUrl
  if (req.file) {
    console.log('req.file')
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill'
    })
    imageUrl = image.secure_url
  }
  const _id = plant._id
  delete plant._id
  try {
    console.log('updating')
    const coll = req.db.collection('plants')
    const doc = await coll.updateOne(
      { _id: ObjectID(_id) },
      {
        $set: {
          ...plant,
          ...(imageUrl && { imageUrl })
        }
      },
      { upsert: true }
    )
    console.log(doc.modifiedCount)
    const sp = await coll.findOne({ _id })
    console.log('updated')
    return res.send(sp)
  } catch (e) {
    console.log('error', e)
    return res.status(500)
  }
})

export default handler
