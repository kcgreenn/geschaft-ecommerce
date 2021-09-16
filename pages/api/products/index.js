import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const { category } = req.query;
  const products = await Product.aggregate([{ $sample: { size: 3 } }]);
  await db.disconnect();
  res.send(products);
});

export default handler;
