var mysql = require('mysql');
var dateFormat = require('dateformat');



module.exports = {
    getProducts: function(req,res,next){
        var config = require('.././database/config');

        var db = mysql.createConnection(config);
        db.connect();
        var products = null;
        db.query('SELECT * FROM products', function(err, rows, fields){
            if(err) throw err;

            products = rows;

            db.end();
            
            res.render('products/products', {products: products});
        }); 
    },


    getNewProducts: function(req,res,next){
        res.render('products/new');
    },


    postNewProducts: function(req,res,next){
        var timeactual = new Date();
        var time = dateFormat(timeactual, 'yyyy-mm-dd h:MM:ss');

        var product = {
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            date_created: time
        }
        
        var config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();

        db.query('INSERT INTO products SET ?', product, function(err,rows,fields){
            if(err) throw err;
            db.end();
        });

        res.render('products/new', {info: 'Product registered'});
    },


    deleteProducts: function(req,res,next){
        var id = req.body.id;
        var config = require('.././database/config');
        var db = mysql.createConnection(config);
        db.connect();
        var response = {res: true};

        db.query('DELETE FROM products WHERE product_id = ?', id, function(err,rows,fields){
            if(err) throw err;
                
            db.end();
            response.res = true;
            res.json(response);
        });
    }
}