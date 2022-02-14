import nc from 'next-connect';
import Review from '../../../Models/Review';
import db from '../../../utils/db';

const handler = nc();

// API endpoint to retrieve reviews for a product; based on ASIN
// req.query should contain the asin
handler.get(async (req, res) => {
  await db.connect();               // Connect to database
  // Return three revies with given asin
  const reviews = await Review.find({ asin: req.query.asin }, null, {
    limit: 3,
  });
  await db.disconnect();            // Disconnect from Database
  res.send(reviews);                // Return array of review objects in response to client request
});

export default handler;
