import Message from "../models/message.model";

const sendMessage = async (message: any) => {
    return await Message.create(message);
}

export default { sendMessage };