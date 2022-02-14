import nc from 'next-connect';
import Order from '../../../../Models/Order';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);      // Check if user is authenticated
// API endpoint to pay for an order
handler.put(async (req, res) => {
  await db.connect();     // Connect to database
  // Find order by order ID
  const order = await Order.findById(req.query.id);
  // IF the order is found in database
  if (order) {
    order.isPaid = true;        // Set paid status to true
    order.paidAt = Date.now();  // Set paid at data to now
    order.paymentResult = {     // Save information about order payment
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save(); // Save updated order information to database
    await db.disconnect();                // Disconnect from database
    // Return order success message in response to client request
    res.send({ message: 'Order paid', order: paidOrder });
  } else {
    await db.disconnect();              // Disconnect from database
    // Return error message if order could not be fouund
    res.status(404).send({ message: 'Order not found' });
  }
});

export default handler;
