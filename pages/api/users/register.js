import nc from 'next-connect';
import User from '../../../Models/User';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const createdUser = await newUser.save();
  await db.disconnect();
  const token = signToken(createdUser);
  res.send({
    token,
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
  });
});

export default handler;
