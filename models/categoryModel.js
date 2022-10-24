const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'No `name` key in request'],
  },
});

module.exports = mongoose.model('category', categorySchema);
