import jwt from "jsonwebtoken";
import { resendEmailController } from "../EmailController/emailController.js";
import checkDbForEntity from "../../Helper/databaseSelector.js";
import { onboardingUser } from "../../template/emaillTemplate/emailTemplate.js";

const create = async (req, res, next) => {
    try {
        let { entity } = req.query;
        let { values } = req.body;
        let tenantId = req.tenantId;
        if (!entity || !values) {
            throw new Error("invalid payload");
        }

        // Finding the DataBase for the Entity
        let dataBase = checkDbForEntity(entity);
        let existingUser = await dataBase.findOne({email:values.email})
        if(existingUser){
            throw new Error("email register with other user")
        }

        values["tenantId"] = tenantId;
        let newData = new dataBase(values);
        let savedData = await newData.save();

        if (!savedData) {
            throw new Error(`Failed to Create new ${req.entity} data`);
        }

        //IF entity is user then send email to on board the user
        if (entity === "user") {
            // get organization
            let organizationDatabase = checkDbForEntity("tenant");
            let organizationData = await organizationDatabase.findOne({
                _id:tenantId,
            });

            const token = jwt.sign(
                {
                    id: savedData._id,
                    tenantId: tenantId,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            let frontEndUrl = process.env.myfac8ryFrontEndUrlProd;
            if (process.env.NODE_ENV === "development") {
                frontEndUrl = process.env.myfac8ryFrontEndUrl;
            }

            let domain = `${frontEndUrl}/onboardUser/${token}`;
            let contents = onboardingUser(organizationData.companyName,domain)
            let response = await resendEmailController(
                organizationData?.email,
                values?.email,
                `You’ve been invited to join${organizationData?.companyName} `,
                contents,
                []
            );

            if (!response) {
                await dataBase.deleteOne({ _id: savedData._id });
                throw new Error("Failed to OnBoard User");
            }
        }

        res.status(200).json({
            success: 1,
            result: {},
            message: `New ${entity} data is saved`,
        });
    } catch (error) {
        next(error);
    }
};

export default create;
