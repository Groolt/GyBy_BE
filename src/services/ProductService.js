const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is already'
                })
            }
            
            const newProduct = await Product.create({
                name, image, type, price, countInStock, rating, description, discount
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
         
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailProduct = (productID) => {
    return new Promise(async (resolve, reject) => {
        try {
          
            const checkProduct = await Product.findOne({
                _id: productID
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkProduct
            })
   
        } catch(e) {
            reject(e)
        }
    })
}
const deleteProduct = (productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: productID
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(productID)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch(e) {
            reject(e)
        }
    })
}
const deleteProducts = (productsID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: productsID})
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getAllProduct = (limit = 5, page = 1, sort = "asc", sortby = "name", filter, filterby = "name") => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            if(filter){
                const allProduct = await Product.find({
                    [filterby]: {$regex : filter}
                }).skip((page - 1) * limit).limit(limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProduct,
                    totalProduct: allProduct.length,
                    pageCurrent: page,
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }
            const objectSort = {}
            objectSort[sortby] = sort
            const allProduct = await Product.find().skip((page - 1) * limit).limit(limit).sort(objectSort)
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                totalProduct,
                pageCurrent: page,
                totalPage: Math.ceil(totalProduct/limit)
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType
            })
        } catch(e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteProducts,
    getType
}