const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                email,
                password: hash,
                phone
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {email, password} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword =  bcrypt.compareSync(password, checkUser.password)
            if(comparePassword) {
                const accessToken = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                const refreshToken = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    accessToken,
                    refreshToken
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'The username or password is incorrect'
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

const updateUser = (userID, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userID
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(userID, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Success',
                data: updateUser
            })
        } catch(e) {
            reject(e)
        }
    })
}

const deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userID
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(userID)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch(e) {
            reject(e)
        }
    })
}

const deleteUsers = (usersID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({_id: usersID})
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getDetailUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: userID
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkUser
            })
        } catch(e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    deleteUsers
}