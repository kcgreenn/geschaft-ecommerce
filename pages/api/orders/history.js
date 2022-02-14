import nc from 'next-connect';
import Order from '../../../Models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});
// Middleware to check authentication status
handler.use(isAuth);

// API endpoint to request list of current user's orders
handler.get(async (req, res) => {
  await db.connect();     // Connect to database
  // Find list of orders by user ID
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);       // Return array of orders in response to client request
});

export default handler;
