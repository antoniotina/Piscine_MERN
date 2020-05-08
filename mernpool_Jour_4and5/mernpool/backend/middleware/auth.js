const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    // check if token exists
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" })

    try {
        // verify if the token against the secret
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        // add user
        req.user = decoded
        next()
    } catch (e) {
        res.status(400).json({ msg: "Token is not valid" })
    }
}


module.exports = auth