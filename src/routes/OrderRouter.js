const express = require("express");
const router = express.Router()
const orderController = require('../controller/OrderController');
const { authUserMiddelware, authMiddelware } = require("../middleware/authMiddelware")

router.post('/create', authUserMiddelware, orderController.createOrder)
router.get('/get-all-order/:id',authUserMiddelware, orderController.getAllOrderDetails)
router.get('/get-details-order/:id', orderController.getDetailsOrder)
router.delete('/cancel-order/:id',authUserMiddelware, orderController.cancelOrderDetails)
router.get('/get-all-order',authMiddelware, orderController.getAllOrder)


module.exports = router