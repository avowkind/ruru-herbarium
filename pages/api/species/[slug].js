
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware'
import { ObjectID } from 'mongodb'
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log('get', req.query.slug)
  try {
    const sp = await req.db
      .collection('species')
      .findOne({ slug: req.query.slug })
    if (!sp) 
      res.status(404).json({})
    else
      res.json(sp);
  } catch (e) {
    console.log('error', e)
    res.status(500).json(e)
  }

});

handler.put(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  const species = req.body
  console.log('put', species)
  if (!species) return res.status(400).send('empty body')
  
  const _id = species._id 
  delete species._id
  try {
    console.log('updating')
    const coll = req.db.collection('species')
    const doc = await coll.updateOne( 
      {"_id": ObjectID(_id)}, 
      { $set: species },
      { upsert: true }
    )
    console.log(doc.modifiedCount)
    const sp = await coll.findOne({ _id })
    console.log('updated')
    return res.send(sp);
  } catch (e) {
    console.log('error', e)
    return res.status(500)
  }
})

export default handler;
