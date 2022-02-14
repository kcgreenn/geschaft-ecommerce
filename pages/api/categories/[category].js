import nc from 'next-connect';
import Product from '../../../Models/Product';
import db from '../../../utils/db';

const handler = nc();

// API endpoint to request products in given category
handler.get(async (req, res) => {
  await db.connect();     // Connect to database

  // Return all products in given category; limited to 15; skipping first "skip" entries
  const products = await Product.find({ category: req.query.category }, null, {
    skip: req.query.skip,
    limit: 15,
  });
  
  await db.disconnect();    // Disconnect from database
  res.send(products);       // Return matching products in response to client request
});

export default handler;
