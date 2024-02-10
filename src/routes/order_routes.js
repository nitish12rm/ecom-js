const orderRoute = require('express').Router();
const orderController = require('./../controllers/order_controller');

orderRoute.post('/',orderController.createOrder);
orderRoute.get('/:id',orderController.fetchUserOrder);
orderRoute.put('/updateStatus',orderController.updateOrderStatus);
module.exports = orderRoute;