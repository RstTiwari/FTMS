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

export const createEnquiry = async (req, res, next) => {
    try {
        let { from, to, sub, content, customer, material, process } = req.body;
        const filesName = []
        const attachments = req.files.map((file) => {
            const fileBuffer = fs.readFileSync(file.path);
            const fileContent = fileBuffer.toString("base64");
            filesName.push(file.originalname)
            return {
                content: fileContent,
                filename: file.originalname,
                encoding: "base64"
            };
        });

        let enquiryData = {
            customer: customer,
            material: material,
            process: process,
            files:filesName
        };

       // create Enquiry Data for the Tenant
       let enquiryDatabase = checkDbForEntity("enquiry");
       let newData = new enquiryDatabase(enquiryData);
       await newData.save();
        let response = await resendEmailController(
            from,
            to,
            ["iamrrt2121@gmail.com"],
            sub,
            content,
            attachments
        );
        if (!response) {
            throw new Error("Failed to send email");
        }
  
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
