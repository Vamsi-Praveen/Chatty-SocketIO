import Message from "../models/message.model.js";

export const saveMessage = async (req, res) => {
    try {
        const { username, text } = req.body;
        const newMessage = new Message({ username, text });
        await newMessage.save();
        return res.status(201).json(newMessage); // Return the newly saved message
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
