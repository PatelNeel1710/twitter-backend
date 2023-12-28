import mongoose, { Schema } from 'mongoose';

const followSchema: Schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    follows: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const Follow = mongoose.model('follow', followSchema);

export default Follow;