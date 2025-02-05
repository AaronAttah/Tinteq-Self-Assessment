import mongoose from 'mongoose';
/**
 * Check if a string is a valid ObjectId
 */

export const isObjectId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id);
};