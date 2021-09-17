import nc from 'next-connect';
import Product from '../../Models/Product';
import User from '../../Models/User';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  console.log(data.users[0]);
  await User.deleteMany();
  await User.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seed succeeded' });
});

export default handler;
