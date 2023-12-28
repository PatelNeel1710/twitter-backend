import Follow from "../models/follow.model";


const saveFollow = async (follow: any) => {
    return await Follow.create(follow);
}

export default { saveFollow };