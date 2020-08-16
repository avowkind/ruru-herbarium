import nextConnect from 'next-connect';
// import { nanoid } from 'nanoid';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const species = await req.db
    .collection('species')
    .find({})
    // .sort({ name })
    .toArray();
  res.send(species);
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  const species = req.body
  if (!species) return res.status(400).send('You must write something');

  const sp = {
    ...species,
    createdAt: new Date(),
    creatorId: req.user._id,
  };

  await req.db.collection('species').insertOne(sp);
  return res.send(sp);
});

export default handler;
