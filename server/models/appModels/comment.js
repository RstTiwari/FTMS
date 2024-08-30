// models/commentModel.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    },
    entityType: {
        type: String, // e.g., 'Customer', 'Invoice', 'Payment'
        required: true,
    },
    userName:{
      type:String,

    },
    entityId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    additionalInfo: {
        type: Map,
        of: Schema.Types.Mixed, // To store additional details
    },
});

const Comment = mongoose.model('Comment', commentSchema);

// Static method to add a comment
commentSchema.statics.addComment = async function (entityType, entityId, commentData) {
    try {
        const newComment = new this({
            ...commentData,
            entityType,
            entityId,
        });
        return await newComment.save();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error('Failed to add comment');
    }
};

export default Comment;
