import User from "../models/user.model";

const createUser = async (user: any) => {
    return await User.create(user);
}

export default { createUser };