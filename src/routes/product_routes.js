const produtRoutes = require('express').Router();
const productController = require('./../controllers/product_controller');

produtRoutes.post('/',productController.createproduct);
produtRoutes.get('/',productController.fetchAllProduct);
produtRoutes.get('/:id',productController.fetchproductById);
produtRoutes.get('/cat/:id',productController.fetchproductByCategory);

module.exports = produtRoutes;
