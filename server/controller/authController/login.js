import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} userDb  // userDatabase
 * @param {*} passworDb // userpasswordDatabse
 * @returns  {sucess:1, userId:string , name:string}
 */

const login = async (req, res, next, userDb, userPassworDb, tenantDb) => {
    const { email, password } = req.body;
    // validate the input values
    const ObjectSchema = joi.object({
        email: joi
            .string()
            .email({ tlds: { allow: true } })
            .required(),
        password: joi.string().required(),
    });

    const { error, value } = ObjectSchema.validate({ email, password });
    if (error) {
        return res.status(409).json({
            sucess: 0,
            result: null,
            message: "Invalid/Missing credentials",
            errorMessage: error.message,
        });
    }

    const user = await userDb.findOne({ email: email, removed: false });
    if (!user) {
        return res.status(409).json({
            success: 0,
            result: null,
            message: "No user regitred with this email",
        });
    }

    const userPassword = await userPassworDb.findOne({
        userId: user._id,
        removed: false,
    });
    const isMatch = await bcrypt.compare(
        userPassword.salt + password,
        userPassword.password
    );

    if (!isMatch) {
        return res.status(403).json({
            success: 0,
            result: null,
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: req.body.remember ? 365 * 24 + "h" : "24h" }
    );

    await userPassworDb
        .findOneAndUpdate(
            { userId: user._id },
            { $push: { loggedSessions: { token: token } } },
            { new: true }
        )
        .exec();
    let tenantId = user.tenantId;
    const tenantData = await tenantDb.findOne({ tenantId: tenantId });
    //if compnay logoneeded call api
    res.status(200).json({
        success: 1,
        result: {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            role: user.role,
            email: user.email,
            photo: user.photo,
            companyName: tenantData.companyName,
            tenantId:tenantId,
            token: token,
            expiresIn: req.body.remember  ?  (365 * 86400) :( 86400 )
        },
        message: "Successfully login user",
    });
};

export default login;
