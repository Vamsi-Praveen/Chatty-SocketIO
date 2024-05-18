import express from "express";
import { getMessages, saveMessage } from "../controllers/message.controller.js";

const msgRouter = express.Router();

msgRouter.post('/message', saveMessage);
msgRouter.get('/get-messages', getMessages)

export default msgRouter