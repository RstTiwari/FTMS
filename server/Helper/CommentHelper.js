// commonPostSaveHandler.js
import checkDbForEntity from "./databaseSelector.js";

export const commentSaveHandler = async (doc, { req, entity, text }) => {
    try {
        let { name, userId, tenantId } = req;

        let CommentDatabase = checkDbForEntity("comments");
        let newComment = new CommentDatabase({
            text: text,
            entity: entity,
            entityId: doc._id,
            userName: name,
            tenantId: tenantId,
            userId: userId,
            additionalInfo: doc,
        });
        await newComment.save();
    } catch (error) {
        console.error("Error in post-save logic:", error);
    }
};
