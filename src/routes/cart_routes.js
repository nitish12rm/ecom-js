const cartRoute = require('express').Router();
const cartController = require('./../controllers/cart_controller');

cartRoute.post('/',cartController.addToCart);
cartRoute.delete('/',cartController.removeFromCart);
cartRoute.get('/:id',cartController.fetchCart);
// cartRoute.get('/:id',cartController.fetchCategoryById);

module.exports = cartRoute;
