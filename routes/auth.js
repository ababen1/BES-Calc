const jwt = require("jsonwebtoken");

const VerifyToken = async (request, response, next) => {

    try {
        const token = request.body.token || request.headers["token"];
        if (!token) {
            return response.status(401).send("no token found");
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await decoded;
        if (!user) {
            return response.status(401).send("invalid token");
        } else {
            request.user = user;
            console.log("authorized user: " + request.user.id);
           return next();
        }


    } catch (err) {
        response.status(401).json({
            error: new Error("Invalid request")
        })
    }

}

module.exports = VerifyToken;
