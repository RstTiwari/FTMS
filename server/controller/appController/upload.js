import { v2 as Cloudinary } from "cloudinary";
import fs from "fs";

const upload = async (req, res, next, database) => {
    if (!req.file) {
        const response = {
            success: 0,
            result: null,
            message: "No File attached Please try again",
        };
        return res.status(400).json(response)
    }
    const file = req.file.path;

    try {
        const { entity } = req.body;
        const tenantId = req.tenantId;
        const cloudName = `${tenantId}`;
        const uploadImage = await Cloudinary.uploader.upload(file, {
            public_id: cloudName,
        });

        if (!uploadImage.public_id) {
            throw new Error("Failed to upload image on the cloud");
        }
        const response = {
            success: 1,
            result: uploadImage.secure_url,
            message: `${entity} file uplaoded successfully`,
        };

        res.status(200).json(response);
        return fs.unlinkSync(file);
    } catch (error) {
        console.error(error);
        const response = {
            success: 0,
            result: null,
            message: error.message,
        };
        res.status(200).json(response);
        return fs.unlinkSync(file);
    }
};
export default upload;
