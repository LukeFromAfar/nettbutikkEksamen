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
    },

    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { price, description, category } = req.body;
            
            // Find the product
            const product = await Product.findById(productId);
            
            if (!product) {
                return res.status(404).send({ msg: 'Product not found' });
            }
            
            // Update fields
            product.price = price;
            product.description = description;
            product.category = category;
            
            // Handle image update if new image is uploaded
            if (req.files && req.files.image) {
                // Delete old image if it exists
                if (product.image) {
                    const oldImagePath = path.join(__dirname, '..', product.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                
                // Save new image
                const imageFile = req.files.image;
                const filename = Date.now() + path.extname(imageFile.name);
                const uploadPath = path.join(__dirname, '../uploads/' + filename);
                
                await imageFile.mv(uploadPath);
                product.image = `/uploads/${filename}`;
            }
            
            await product.save();
            res.status(200).send({ msg: 'Product updated successfully', product });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: 'Error updating product' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            
            // Find the product to get the image path
            const product = await Product.findById(productId);
            
            if (!product) {
                return res.status(404).send({ msg: 'Product not found' });
            }
            
            // Delete the image file if it exists
            if (product.image) {
                const imagePath = path.join(__dirname, '..', product.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            
            // Delete the product from the database
            await Product.findByIdAndDelete(productId);
            
            res.status(200).send({ msg: 'Product deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: 'Error deleting product' });
        }
    }
};

module.exports = productController;