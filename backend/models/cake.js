const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  flavour: String,
});

const Cake = mongoose.model('Cake', cakeSchema, 'cakess');  

module.exports = Cake;
