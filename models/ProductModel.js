// 1. Import the mongoose Library
const mongoose = require('mongoose');

// 2. Create a Schema
const ProductSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }       
       
    }
)

// 3. Create a Model
const ProductModel = mongoose.model('products', ProductSchema);

// 4. Export Model
module.exports = ProductModel;