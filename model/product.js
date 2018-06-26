var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }

} ,
    { versionKey: false })

module.exports = Product = mongoose.model('Product', productSchema);
   
