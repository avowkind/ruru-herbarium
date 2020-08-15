import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const { name, password } = req.body;
  const user = await req.db
    .collection('species')
    .insertOne({
      _id: nanoid(12),
      ...req.body
    })
});

export default handler;
