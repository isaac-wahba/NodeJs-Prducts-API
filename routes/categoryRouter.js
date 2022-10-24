const express = require('express');

const routes = (Category) => {
  const categoryRouter = express.Router();

  categoryRouter.route('/categories').get((req, res) => {
    Category.find((err, categories) => {
      if (err) {
        return res.send(err);
      }
      // console.log(categories);
      return res.json({
        success: true,
        results: categories,
      });
    });
  });
  return categoryRouter;
};

module.exports = routes;
