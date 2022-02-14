import mongoose from 'mongoose';

// Mongoose schema for product reviews.
// Contains reviewer info, asin of reviewed product, etc...
const reviewSchema = new mongoose.Schema(
  {
    rating: { type: String, required: true },
    asin: { type: String, required: true },
    reviewerName: { type: String, required: true },
    reviewText: { type: String, require: true },
    summary: { type: String, required: true },
    reviewTime: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
