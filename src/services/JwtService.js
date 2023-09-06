const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESSTOKEN, {expiresIn: '30s'})
    return accessToken
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        ...payload
    }, process.env.REFRESHTOKEN, {expiresIn: '365d'})

    return refreshToken
}

const refreshToken =  (token) => {
    return new Promise((resolve, reject) => {
        try {
                jwt.verify(token, process.env.REFRESHTOKEN, async (err, user) =>{
                if(err){
                    resolve({
                        status: 'ERR',
                        message: 'The authentication',
                    })
                }
                const accessToken = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    accessToken
                })
            })
            
        } catch(e) {
            reject(e)
        }
    })
}
module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshToken
}