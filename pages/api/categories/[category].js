import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  console.log(req.query);
  const products = await Product.find({ category: req.query.category }, null, {
    skip: req.query.skip,
    limit: 15,
  });
  await db.disconnect();
  res.send(products);
});

export default handler;
