import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

// API endpoint to find product of given product ID
// req.query should contain the product ID
handler.get(async (req, res) => {
  await db.connect();       // Connect to database
  // Find a product with given product ID
  const product = await Product.findById(req.query.id);
  await db.disconnect();   // Disconnect from database
  res.send(product);      // Return produst in response to client request
});

export default handler;
