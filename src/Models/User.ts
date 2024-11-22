import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    location: { type: String },
    isBlocked: { type: Boolean, default: false },
    username: { type: String }
});

const User = mongoose.model('User', userSchema)

export default User