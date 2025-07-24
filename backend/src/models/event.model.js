import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['webinar', 'seminar', 'course'], required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  date: { type: Date, required: true },
  time: { type: String },
  pricing: { type: String, enum: ['free', 'paid'], required: true },
  price: { type: String },
  location: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  duration: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'expired'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
