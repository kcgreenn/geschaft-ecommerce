import nc from 'next-connect';
import User from '../../../Models/User';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

// API endpoint to create a new user profile
// req.body should contain:
//    name, email, password, fullName, address, city, postalCode,
//    country
handler.post(async (req, res) => {
  await db.connect();                           // Connect to database
  const newUser = new User({                    // Create new user
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    fullName: req.body.fullName,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country,
    isAdmin: false,
  });
  const createdUser = await newUser.save();       // Save new user to database
  await db.disconnect();                          // Disconnect from database
  const token = signToken(createdUser);           // Create json web token for user authentication
  res.send({                                      // Return json web token and user info in response to client request
    token,
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    fullName: createdUser.fullName,
    address: createdUser.address,
    city: createdUser.city,
    postalCode: createdUser.postalCode,
    country: createdUser.country,
    isAdmin: createdUser.isAdmin,
  });
});

export default handler;
