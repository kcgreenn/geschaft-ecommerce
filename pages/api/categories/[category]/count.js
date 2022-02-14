import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

// API endpoint to find total count of products in given category
handler.get(async (req, res) => {
  await db.connect();     // Connect to the database
  // Find the total count of products in given category
  const count = await Product.count({ category: req.query.category });

  await db.disconnect();      // Disconnect from database
  res.send({ count: count }); // Return total count in response to client request
});

export default handler;
