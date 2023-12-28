import mongoose, { Schema } from "mongoose";

const messageSchema: Schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        text: String,
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('message', messageSchema);

export default Message;