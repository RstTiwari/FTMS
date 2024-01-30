import jwt from "jsonwebtoken";
/**
 *
 * @param {*} param
 * @returns in reposse
 */
const isValidAuthtoken = async (req, res, next, userDb, userPasswordDb,tenantDb ) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({
                success: 0,
                result: null,
                message: "No authentication token, authorization denied.",
                jwtExpired: true,
            });
        }
        const verfied = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verfied);
        if (!verfied) {
            return res.status(401).json({
                success: 0,
                result: null,
                message: "Token verification failed, authorization denied.",
                jwtExpired: true,
            });
        }
        const user = await userDb.findOne({ _id: verfied.userId});

        if (!user) {
            return res.status(401).json({
                success: 0,
                result: null,
                message: "User does not Exist , autherization denied ",
                jwtExpired: true,
            });
        }

        // const { loggedSessions } = userPassword;
        // if (!loggedSessions.includes(token)) {
        //     return res.status(401).json({
        //         success: 0,
        //         result: null,
        //         message:
        //             "User is already logout try to login, authorization denied.",
        //         jwtExpired: true,
        //     });
        // } else {

            req[user] = user
            req.tenantId = user.tenantId;
            next();
        // }
    } catch (error) {
        return res.status(503).json({
            status: 0,
            result: null,
            message: error.message,
            error: error,
            controller: "isValidAuthToken",
        });
    }
};
export default isValidAuthtoken;
