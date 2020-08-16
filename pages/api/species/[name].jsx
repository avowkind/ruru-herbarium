
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const species = await req.db
    .collection('species')
    .findOne({ name: req.query.name })
  res.send(species);
});

export default handler;
