import mongoose from 'mongoose';

// Mongoose schema for a product
// Contains price, title, category, rating, etc...
const productSchema = new mongoose.Schema(
  {
    category: [{ type: String, required: true }],
    slug: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, require: true },
    also_buy: [{ type: String, required: false }],
    brand: { type: String, required: true },
    feature: [{ type: String, required: false }],
    rank: { type: String, required: false },
    also_view: [{ type: String, required: false }],
    price: { type: Number, required: true },
    asin: { type: String, required: true },
    imageURLHighRes: { type: String, required: false },
    imageURL: { type: String, requried: true },
    rating: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
