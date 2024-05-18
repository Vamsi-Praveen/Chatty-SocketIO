import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    username: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
}, { collection: "messages" });

const Message = model('Message', messageSchema);

export default Message;
