import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    reservedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  },   
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;