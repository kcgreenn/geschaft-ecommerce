import nc from 'next-connect';
import Order from '../../../../Models/Order';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);    // Check if user is authenticated
// API endpoint find order by order ID
handler.get(async (req, res) => {
  await db.connect();     // Connect to database
  // Find order by order ID
  const order = await Order.findById(req.query.id);
  await db.disconnect();    // Disconnect from database
  res.send(order);      // Return order object in response to client request
});

export default handler;
