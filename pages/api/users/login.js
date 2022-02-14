import nc from 'next-connect';
import User from '../../../Models/User';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

// API endpoint to handle user login
// req.body should contain:
//    email, password
handler.post(async (req, res) => {
  await db.connect();             // Connect to database
  // Query for user with given email
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();          // Disconnect from database
  // Compare the hashed password in the database to the one given by the user
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // Create a json web token for client authentication
    const token = signToken(user);
    // Return the token and user information in response to client request
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      fullName: user.fullName,
      address: user.address,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country,
      isAdmin: user.isAdmin,
    });
  } else {      // If user email is not found or password is inccorect, send error message
    res.status(401).send({ message: 'Invalid Email or Password' });
  }
});

export default handler;
