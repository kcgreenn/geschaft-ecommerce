import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

// API endpoint to retrieve three random products
// req.query should contain the category
handler.get(async (req, res) => {
  await db.connect();                 // Connect to database
  const { category } = req.query;     // Destructure category from req.query
  // Find three random products from database
  const products = await Product.aggregate([{ $sample: { size: 3 } }]);
  await db.disconnect();              // Disconnect from database
  res.send(products);                 // Return array of products in response to client request
});

export default handler;
