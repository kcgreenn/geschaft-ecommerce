import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

// API endpoint to find the total number of products with matching brandname
handler.get(async (req, res) => {
  await db.connect();     // Connect to database
  // Find total count of products with matching brandname
  const count = await Product.count({ brand: req.query.brand }); 

  await db.disconnect();        // Disconnect from database
  res.send({ count: count });   // Return total count to requesting client
});

export default handler;
