import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  image: {
    type: String,
    default: 'https://www.dreamstime.com/default-avatar-profile-icon-social-media-user-image-gray-blank-silhouette-vector-illustration-image305504015',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;