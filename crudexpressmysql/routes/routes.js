var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

/* GET home page. */
router.get('/', controllers.homecontroller.index);

//products routes
router.get('/products',controllers.productscontroller.getProducts);
router.get('/new',controllers.productscontroller.getNewProducts);
router.post('/createproducts',controllers.productscontroller.postNewProducts);
router.post('/deleteproducts',controllers.productscontroller.deleteProducts);

module.exports = router;
