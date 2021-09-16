import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const limit = 12;
  await db.connect();

  const products = await Product.find({ brand: req.query.brand }, null, {
    skip: req.query.index * limit,
    limit: limit,
  });

  await db.disconnect();
  res.send(products);
  products.length = 0;
});

export default handler;
