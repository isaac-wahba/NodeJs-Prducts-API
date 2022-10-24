const express = require('express');
const routes = (Product) => {
  const productRouter = express.Router();
  productRouter
    .route('/products')
    .post((req, res) => {
      const product = new Product(req.body);
      product.save();
      return res.status(201).json({
        success: true,
        results: product,
      });
    })

    .get((req, res) => {
      const query = {};

      if (req.query.categoryId) {
        query.categoryId = req.query.categoryId;
      }

      Product.find(query, (err, products) => {
        if (err) {
          console.log('we have an error:');
          return res.send(err);
        }
        return res.json({
          success: true,
          results: products,
        });
      });
    });

  productRouter.use('/products/:productId', (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
      if (err) {
        return res.send(err);
      }
      if (product) {
        req.product = product;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  productRouter
    .route('/products/:productId')
    .get((req, res) => {
      return res.json({
        success: true,
        results: req.product,
      });
    })
    .put((req, res) => {
      const { product } = req;
      product.name = req.body.name;
      product.quantity = req.body.quantity;
      product.price = req.body.price;
      product.imgUrl = req.body.imgUrl;
      product.categoryId = req.body.categoryId;
      req.product.save((err) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            success: true,
            results: product,
          });
        }
      });
    })
    .patch((req, res) => {
      const { product } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        product[key] = value;
      });
      req.product.save((err) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            success: true,
            results: product,
          });
        }
      });
    });
  return productRouter;
};

module.exports = routes;
