const mongoose = require('mongoose');

const { Schema } = mongoose;
const productModel = new Schema({
  name: {
    type: String,
    required: [true, 'No `name` key in request'],
  },
  quantity: {
    type: Number,
    required: [true, 'No `quantity` key in request'],
  },
  price: {
    type: Number,
    required: [true, 'No `price` key in request'],
  },
  imgUrl: {
    type: String,
    required: [true, 'No `imgUrl` key in request'],
  },
  categoryId: Number,
});

module.exports = mongoose.model('products', productModel);
