import Follow from "../models/follow.model";
import Message from "../models/message.model";
import _ from "lodash";

const postMessage = async (message: any) => {
    return await Message.create(message);
}

const getMyFeed = async (userId: string) => {
    const userMessages = await Message.find({ user: userId });
    const following = await Follow.find({ userId });
    const followingUserIds = following.map((follow) => follow.follows);
    const followingPosts = await Message.find({ user: { $in: followingUserIds } }).populate('user', 'email');
    const allMessages = [...userMessages, ...followingPosts];
    const sortedMessages = _.orderBy(allMessages, ['createdAt'], ['desc']);
    return sortedMessages;
}

export default { postMessage, getMyFeed };