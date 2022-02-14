import nc from 'next-connect';
import Product from '../../../../Models/Product';
import db from '../../../../utils/db';

const handler = nc();

// API endpoint to get products in given category with pagination
handler.get(async (req, res) => {
  const limit = 12;     // Limit results to 12 per page
  await db.connect();   // Connect to database
  //Get 12 products with matching category starting at index "skip"
  const products = await Product.find({ category: req.query.category }, null, {
    skip: req.query.index * limit,
    limit: limit,
  });

  await db.disconnect();  // Disconnect from database
  res.send(products);     // Return the matching products in the response to the requesting client
  products.length = 0;
});

export default handler;
