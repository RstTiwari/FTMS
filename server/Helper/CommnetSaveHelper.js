// commonPostSaveHandler.js
import Comment from './models/commentModel'; // Adjust the path as needed

const commonPostSaveHandler = (options) => {
    return async function (doc) {
        try {
            const userId = this.getOptions().userId; // Access userId from save options

            if (options?.updateComments) {
                await Comment.addComment(
                    options.entityType || 'Unknown',
                    doc._id,
                    options.commentData || { text: 'Document saved or updated', author: userId }
                );
            }
        } catch (error) {
            console.error('Error in post-save logic:', error);
        }
    };
};

export default commonPostSaveHandler;
