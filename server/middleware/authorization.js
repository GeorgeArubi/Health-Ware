const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async(req, res, next) => {
    try {
        //1. destructure the token

        const jwtToken = req.header("token")

        //2. check if the request has a token
        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        //3. verify the token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)

        req.user = payload.user
        next()
    } catch (error) {
        console.error(error.message)
        return res.status(403).json("Not Authorized")
    }
}