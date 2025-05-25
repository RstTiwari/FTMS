import checkDbForEntity from "../../Helper/databaseSelector.js";
import { resendEmailController } from "../EmailController/emailController.js";
import fs from "fs";

export const emailData = async (req, res, next) => {
    try {
        let { entity, id } = req.query;
        let tenantId = req.tenantId;
        let partyEntity = entity === "purchases" ? "vendors" : "customers";
        let partyKey = entity === "purchases" ? "vendor" : "customer";

        let OrginizationDataBase = checkDbForEntity("tenant");
        let PartyDatabase = checkDbForEntity(partyEntity);
        let EntityDataBase = checkDbForEntity(entity);
        let entityData = await EntityDataBase.findOne({
            _id: id,
            tenantId: tenantId,
        });
        let partyId = entityData[partyKey];

        // let get the partyData
        let partyData = await PartyDatabase.findOne({
            _id: partyId,
            tenantId: tenantId,
        }).select({ name: 1, email: 1 });

        let orginzationData = await OrginizationDataBase.findOne({
            _id: tenantId,
        });

        // //let call the pdf api genarating pdf that to for sending the Email
        // let response = await generatePdf(req, res, next, true);

        // Send response with email data and the generated PDF
        let sub = `Details For ${entity
            .slice(0, entity.length - 1)
            .toUpperCase()}  No  ${entityData?.no}`;
        return res.status(200).json({
            success: 1,
            result: {
                from: orginzationData?.email,
                to: partyData?.email, // or any other field that contains the email
                name: partyData?.name, // or any other field that contains the email
                sub: sub,
                no: entityData?.no,
                entityData: entityData,
            },
            message: "Fetched SucceFully",
        });
    } catch (error) {
        next(error);
    }
};

export const sendEmail = async (req, res, next) => {
    try {
        let { from, to, sub, content } = req.body;
        let { entity, id } = req.query;
        let tenantId = req.tenantId;

        // Read files as buffers and convert to base64 strings
        if (from.endsWith("@gmail.com")) {
            from = from.replace("@gmail.com", "@ftms.myfac8ry.com");
        }
        const attachments = req.files.map((file) => {
            // Read the file content
            const fileBuffer = fs.readFileSync(file.path);
            // Convert the buffer to a base64 string
            const fileContent = fileBuffer.toString("base64");
            return {
                content: fileContent,
                filename: file.originalname,
            };
        });

        let response = await resendEmailController(
            from,
            to,
            sub,
            content,
            attachments
        );
        if (!response) {
            throw new Error("Failed to send email");
        }
        let EntityDataBase = checkDbForEntity(entity);
        await EntityDataBase.updateOne(
            { _id: id, tenantId: tenantId },
            { $set: { status: "SEND" } }
        );

        return res.status(200).json({
            success: 1,
            message: "successfully sended mail",
        });

        // need to update the status of entity to send
    } catch (error) {
        next(error);
    } finally {
        // Ensure that files are removed after processing
        req.files.forEach((file) => {
            try {
                fs.unlinkSync(file.path);
            } catch (err) {
                console.error(`Failed to delete file at ${file.path}:`, err);
            }
        });
    }
};
