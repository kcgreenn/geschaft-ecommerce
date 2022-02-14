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

// API endpoint to create a new order
handler.post(async (req, res) => {
  await db.connect();       // Connect to database
  // Create new order with information from the request
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  // Save the order to database
  const order = await newOrder.save();
  // Return success status code with the confirmed order in the response
  res.status(201).send(order);
});

export default handler;
