const Product = require('../models/ProductSchema');
const path = require('path');
const fs = require('fs');

const productController = {
    addProduct: async (req, res) => {
        try {
            if (!req.files || !req.files.image) {
                return res.status(400).send({ msg: 'No image uploaded' });
            }

            const { name, price, description, category } = req.body;
            const imageFile = req.files.image;
            const filename = Date.now() + path.extname(imageFile.name);
            const uploadPath = path.join(__dirname, '../uploads/' + filename);

            // Move the file
            await imageFile.mv(uploadPath);

            // Create product
            const product = new Product({
                name,
                price,
                description,
                category,
                image: `/uploads/${filename}`
            });

            await product.save();
            res.status(201).send({ msg: 'Product added', product });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: 'Error adding product' });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: 'Error fetching products' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send({ msg: 'Product not found' });
            }
            res.status(200).send(product);
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: 'Error fetching product' });
        }
    }
};

module.exports = productController;