const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {    

    try { 
    const token = await request.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await decoded;
    request.user = user
    next();


    } catch(err) {
        response.status(401).json({
            error: new Error("Invalid request")
        })
    }

}