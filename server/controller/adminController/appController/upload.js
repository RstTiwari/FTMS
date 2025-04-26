import { v2 as Cloudinary } from "cloudinary";
import fs from "fs";

const upload = async (req, res, next) => {
    //Taking file from the Frontend
    const tenantId = req.tenantId;
    if (!req.file || !tenantId) {
        const response = {
            success: 0,
            result: null,
            message: "Invalid Payload",
        };
        return res.status(400).json(response);
    }

    const file = req.file.path;

    try {
        // Upload the resized image to Cloudinary
        const cloudName = `myfac8ry${tenantId}`;
        const uploadImage = await Cloudinary.uploader.upload(file, {
            public_id: cloudName,
        });

        if (!uploadImage.public_id) {
            throw new Error("Failed to upload image on the cloud");
        }
        const response = {
            success: 1,
            result: uploadImage.secure_url,
        };

        res.status(200).json(response);
        return fs.unlinkSync(file);
    } catch (error) {
        next(error);
        return fs.unlinkSync(file);
    }
};
export default upload;
