import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const count = await Product.count({ brand: req.query.brand });

  await db.disconnect();
  res.send({ count: count });
});

export default handler;
