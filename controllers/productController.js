const Product = require('../model/product')
const Category = require('../model/category')
const mongoose = require('mongoose');
const fs = require('fs');
const { product } = require('./adminController');
const Offer = require('../model/OfferModel')
// const { product } = require('./adminController');






const loadAddProduct = async (req, res) => {
    try {

        const categories = await Category.find({})
        res.render('admin/addProduct', { categories })


    } catch (error) {
        console.log('error')
    }
}




const addProduct = async (req, res) => {
    try {

        console.log("it is from add product");
        console.log("reqbody : ", req.body);
        console.log("reqfiles : ", req.files);

        const { name, category, quantity, price, description } = req.body

        console.log(name, category, quantity, price, description + " it is req.body")
        const images = req.files.map(file => file.filename);
        console.log("it is req.files details " + req.files)


        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            images: images,  // Corrected variable name to images
            description: req.body.description,
        });

        await newProduct.save();
        // list_product(req.body.name,req.body.category);

        res.redirect('/admin/product')

        // ... rest of your code
    } catch (error) {
        console.error(error);
        // Handle error response
        // res.status(500).json({ error: 'Internal Server Error' });

    }
}


const loadproduct = async (req, res) => {
    try {

        const liproduct = await Product.find({}).populate('category').populate('offer')
        // console.log(liproduct[0].offer.offerName,'it is offer name')

        if (liproduct) {
            // console.log(liproduct[0].category + "categoryyyyyyyyyyyyyyyyyy")

            res.render('admin/product_list', { liproduct });

        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }


    } catch (error) {
        console.log(error)
    }
}


const blockProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        console.log(productId);

        const checking = await Product.findOne({ _id: productId });

        console.log(checking.is_blocked)

        if (checking.is_blocked == 0) {
            const confirmation = await Product.findOneAndUpdate({ _id: checking._id }, { $set: { is_blocked: 1 } });
            res.json(confirmation)
        } else {

            const confirmation = await Product.findOneAndUpdate({ _id: checking._id }, { $set: { is_blocked: 0 } });
            res.json(confirmation)
        }




    } catch (error) {
        console.log(error);
    }
};



const editProductLoad = async (req, res) => {
    try {

        const productid = req.params.editProduct
        let offer = await Offer.find({ type: 'product' })
        const categories = await Category.find({})

        const sendToEdit = await Product.findOne({ _id: productid }).populate('category').populate('offer')

         



        res.render('admin/editProduct', { sendToEdit, categories, offer });


    } catch (error) {
        console.log(error)
    }
}


const edit_product = async (req, res) => {
    try {
        console.log('it edit product')
        const { productId } = req.params;
        const { name, category, price, quantity, description, existingImages } = req.body;

        // Extract existing images from the request body
        let images = existingImages || [];

        // Append new uploaded images to the list
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                images.push(file.filename);
            });
        }

        // Update the product with the merged list of images
        const proData = await Product.findOneAndUpdate({ _id: productId }, {
            name,
            category,
            price,
            quantity,
            images,
            description
        }, { new: true });

        res.status(200).send({ message: 'Product updated successfully!', product: proData });
    } catch (error) {
        res.status(500).send({ message: 'Error updating product', error });
    }
};

const saveOffer = async (req, res) => {
    try {

        const { offerId } = req.params
        const { productId } = req.params
        console.log(productId, 'it is productid')
        const selectedOffer = await Offer.findOne({ _id: offerId })
        const offeredProduct = await Product.findOne({ _id: productId })
        let offerPrice = offeredProduct.price - (selectedOffer.offPercentage / 100) * offeredProduct.price
        let addOffer = await Product.findOneAndUpdate({ _id: productId }, { $set: { offer: offerId, offerPrice: offerPrice } })
        console.log(addOffer, 'it is addoffer')

        res.json({status:true})






    } catch (error) {

        console.log('an error rendering saveOffer:', error)
    }
}













module.exports = {
    addProduct,
    loadAddProduct,
    loadproduct,
    blockProduct,
    editProductLoad,
    edit_product,
    saveOffer

}





