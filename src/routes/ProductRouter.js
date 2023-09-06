const express = require("express")
const router = express.Router()
const productController = require('../controller/ProductController')
const { authMiddelware } = require("../middleware/authMiddelware")

router.post('/create-product', productController.createProduct)
router.put('/update-product/:id', authMiddelware ,productController.updateProduct)
router.get('/getdetail-product/:id', productController.getDetailProduct)
router.get('/get-product', productController.getAllProduct)
router.get('/get-type', productController.getType)
router.delete('/delete-product/:id', authMiddelware, productController.deleteProduct)
router.post('/delete-products', authMiddelware, productController.deleteProducts)
module.exports = router