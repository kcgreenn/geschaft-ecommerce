import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

// API endpoint for searching brands. Skip is based on [index] * limit
handler.get(async (req, res) => {
  const limit = 12;     // Only return 12 results per page
  await db.connect();   // Connext to database

  // Find products with matching brand name with skip and limit
  const products = await Product.find({ brand: req.query.brand }, null, {
    skip: req.query.index * limit,
    limit: limit,
  });

  await db.disconnect();  // Disconnect from database
  res.send(products);     // Send products to requesting client
  products.length = 0;
});

export default handler;
