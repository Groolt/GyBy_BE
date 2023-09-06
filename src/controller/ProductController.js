const ProductService = require('../services/ProductService')
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating} = req.body
         if (!image || !type || !price || !countInStock || !rating || !name ) {
             return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } 

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const data = req.body
        if(!productID){
            return res.status(200).json({
                stadtus: 'ERR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.updateProduct(productID, data)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if(!productID){
            return res.status(200).json({
                stadtus: 'ERR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.getDetailProduct(productID)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if(!productID){
            return res.status(200).json({
                stadtus: 'ERR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.deleteProduct(productID)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProducts = async (req, res) => {
    try {
        const productsID = req.body.ids
        if(!productsID){
            return res.status(200).json({
                stadtus: 'ERR',
                message: 'The productID is required'
            })
        }
        const response = await ProductService.deleteProducts(productsID)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, sortby, filter, filterby} = req.query
        const response = await ProductService.getAllProduct(Number(limit), Number(page), sort, sortby, filter, filterby)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getType = async (req, res) => {
    try {
        const response = await ProductService.getType()
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
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