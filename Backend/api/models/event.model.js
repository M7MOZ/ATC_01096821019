import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  rating: Number,
  image: String,
  description: String,
  gallery: [String],
  category: String,
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;