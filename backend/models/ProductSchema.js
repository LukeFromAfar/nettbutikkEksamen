// backend/models/ProductSchema.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

const Product = model("Product", productSchema);

module.exports = Product;