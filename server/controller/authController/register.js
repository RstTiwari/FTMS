const bcrypt = require("bcryptjs")
const Joi = require("joi")
const mongoose = require('mongoose');
const { generate: uniqueId } = require('shortid');
const UserModel = require("../../models/coreModels/User")
const UserPassword = require("../../models/coreModels/UserPassword")
const sendEmail = require("../authController/sendEmail")


const register = async (req, res) => {
    const { name, email, password } = req.body;
    //validate input parameters
    const ObjectSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string.required(),
    });
    const { error, value } = ObjectSchema.validate({ name, email, password });
    if (error) {
        return res.send({
            success: 0,
            result: null,
            message: "Invalid/Missing credentials",
        });
    }
    const existingUser =  await UserModel.findOne({email:email,removed:false})
    if (existingUser) {
        return res.send({
            success: 0,
            result: null,
            message: "An account with this email has already been registered.",
        });
    }

    const salt = uniqueId()
    const hashedPassword = bcrypt.hashSync(salt+ password)
    const emailToken = uniqueId();
    const savedUser = await UserModel.create({email,name});
    const registrationDone = await UserPassword.create({
        user: savedUser._id,
        password: hashedPassword,
        salt: salt,
        emailToken,
    });

    if(!registrationDone){
        await UserModel.deleteOne({_id:savedUser._id}).exec();
        return res.send({
            success: 0,
            result: null,
            message: "document couldn't save correctly",
        })
    }
    const Url = process.env.BaseUrl;
    const myfac8ryEmail = process.env.email
    const link = Url + "/verify" + savedUser._id  + "/" + emailToken
    await sendEmail({email, name,link , myfac8ryEmail})
    return res.send({
        success: 1,
        result: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        },
        message: "Account registered successfully. Please verify your email.",
    });

};



module.exports = register




