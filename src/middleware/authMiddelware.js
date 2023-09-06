const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddelware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]
    jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
        if (err) {
            return res.status(200).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(200).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddelware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userID = req.params.id
    jwt.verify(token, process.env.ACCESSTOKEN, function (err, user) {
        if (err) {
            return res.status(200).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userID) {
            next()
        } else {
            return res.status(200).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}
module.exports = {
    authMiddelware,
    authUserMiddelware
}