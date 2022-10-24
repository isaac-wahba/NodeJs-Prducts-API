const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const db = mongoose.connect('mongodb://localhost/products');
mongoose.connect(
  'mongodb+srv://admin1:1234@products.i9yvhi2.mongodb.net/products?retryWrites=true&w=majority'
  // ,
  // {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true,
  // }
);
const port = process.env.PORT || 8000;
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');

const productRouter = require('./routes/productRouter')(Product);
const categoryRouter = require('./routes/categoryRouter')(Category);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', categoryRouter);
app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.listen(port, () => {
  console.log(`App is up and running on port ${port}`);
});
