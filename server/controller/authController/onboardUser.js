import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generate as uniqueId } from "shortid";

const onboardUser = async (
    req,
    res,
    next,
    UserDb,
    UserPasswordDb,
    TenantDb
) => {
    try {
        let { token } = req.query;
        let {name, password } = req.body;
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            throw new Error("Invalid to token");
        }

        let { id, tenantId } = verified;
        // get the userData Form this
        let userData = await UserDb.findOne({ _id: id, tenantId: tenantId });
        if (!userData) {
            throw new Error("No user Found");
        }
        const salt = uniqueId();
        const hashedPassword = bcrypt.hashSync(salt + password);
        //Encrypting the password of user
        const registrationDone = await UserPasswordDb.create({
            userId: userData?._id,
            password: hashedPassword,
            salt: salt,
            emailVerified: true,
            emailOtp: 0,
        });

        if (!registrationDone) {
            throw new Error("Failed To Onboard User");
        }
        // Now Updating the user
        userData.name = name;
        await userData.save();

        res.status(200).json({
            success: 1,
            result: {},
            message: "Onboarding Successful pls login to continue",
        });
    } catch (error) {
        next(error);
    }
};

export default onboardUser;
