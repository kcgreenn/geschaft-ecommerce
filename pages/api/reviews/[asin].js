import nc from 'next-connect';
import Review from '../../../Models/Review';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const reviews = await Review.find({ asin: req.query.asin }, null, {
    limit: 3,
  });
  await db.disconnect();

  res.send(reviews);
});

export default handler;
