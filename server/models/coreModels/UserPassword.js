import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import mongooseAutoPopulate from "mongoose-autopopulate";

const UserPaswordSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    emailOtp: Number,
    emailOtpExpireTime: Number,
    resetOtp: Number,
    resetOtpExpireTime: Number,
    emailVerified: {
        type: Boolean,
        default: false,
    },
    authType: {
        type: String,
        default: "email",
    },
    
    loggedSession:{type:String,unique:true,sparse: true,}
},{timestamps:true});

UserPaswordSchema.method.genrateHash = function (salt, password) {
    return bcrypt.hashSync(salt, password);
};

UserPaswordSchema.method.validPassword = function (salt, userPassword) {
    return bcrypt.compareSync(salt + userPassword, this.password);
};

UserPaswordSchema.plugin(mongooseAutoPopulate);
export default mongoose.model(
    "userpassword",
    UserPaswordSchema,
    "userPassword"
);
