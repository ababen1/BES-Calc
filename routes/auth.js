const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {

    try {
        const token = await request.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await decoded.userId;
        if (request.body.userId && request.body.userId !== user) {
            throw 'invalid user ID'
        } else {
            next();
        }


    } catch (err) {
        response.status(401).json({
            error: new Error("Invalid request")
        })
    }

}