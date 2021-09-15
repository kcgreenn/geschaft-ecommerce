import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const count = await Product.count({ category: req.query.category });

  await db.disconnect();
  res.send({ count: count });
});

export default handler;
