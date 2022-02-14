import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

// API endpoint to find products with matching brandname
handler.get(async (req, res) => {
  await db.connect();       // Connect to database
  // Return products with matching brandname; skip is passed through the request query parameters
  const products = await Product.find({ brand: req.query.brand }, null, {
    skip: req.query.skip,
    limit: 15,
  });
  await db.disconnect();    // Disconnect from database
  res.send(products);       // Return matching products in response to client request
});

export default handler;
