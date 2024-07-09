const Product = require('../model/product')
const Category = require('../model/category')
const Offer = require('../model/OfferModel')
const mongoose = require('mongoose');
const fs = require('fs');
let page;
// const { product } = require('./adminController');
// const { product } = require('./adminController');






const loadAddProduct = async (req, res) => {
    try {

        const categories = await Category.find({})
        let offer = await Offer.find({ type: 'product' })
        res.render('admin/addProduct', { categories, offer })


    } catch (error) {
        console.log('error')
    }
}




const addProduct = async (req, res) => {
    try {

        console.log("it is from add product");
        console.log("reqbody : ", req.body);


        const { name, category, quantity, price, description, offerid } = req.body
        console.log(req.body.offerid, 'it oofer id')

        console.log(name, category, quantity, price, description + " it is req.body")
        const images = req.files.map(file => file.filename);

        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            images: images,  // Corrected variable name to images
            offer: offerid,
            description: req.body.description,
        });

        await newProduct.save();


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

        const allProducts = await Product.find({}).sort({ date: -1 }).populate('category').populate('offer')


        if (allProducts) {
            // page = parseInt(req.query.page, 10) || 1; // Ensuring page is an integer

            if (req.query.page == 'plus') {
                page = parseInt(page + 1)
            } else if (req.query.page == 'minus') {
                page = parseInt(page - 1)
            } else {
                page = parseInt(req.query.page) || 1
            }
            let limit = 7;
            let start = (page - 1) * limit;
            let end = page * limit;

            let liproduct = allProducts.slice(start, end);
            console.log(liproduct, 'it is list product');

            let length = allProducts.length;

            // console.log(liproduct[0].category + "categoryyyyyyyyyyyyyyyyyy")

            res.render('admin/product_list', { liproduct, length });

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
        console.log('Editing product');

        const { productId } = req.params;
        const { name, quantity, category, price, description } = req.body;
        console.log(name, quantity, category, price, description, 'kdflsdjfsjkldf')
        const files = req.files;
        const existingDetails = await Product.findById({ _id: productId });



        let imagestaking = {
            image1: files.image1?.[0]?.filename || existingDetails.images[0],
            image2: files.image2?.[0]?.filename || existingDetails.images[1],
            image3: files.image3?.[0]?.filename || existingDetails.images[2],

        };

        let images = [imagestaking.image1, imagestaking.image2, imagestaking.image3]

        // Update the product with the merged list of images
        const proData = await Product.findOneAndUpdate({ _id: productId }, {
            name,
            category,
            price,
            quantity,
            images,
            description,
            offerPrice: price
        }, { new: true });

        res.redirect('/admin/product')
    } catch (error) {
        console.error('Error updating product:', error);
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

        res.json({ status: true })



    } catch (error) {

        console.log('an error rendering saveOffer:', error)
    }
}



const removeOffer = async (req, res) => {
    try {


        let { type, id } = req.query
        if (type == 'product') {
            let selected = await Product.findOneAndUpdate(
                { _id: id },
                { $unset: { offer: "" } }
            )


        } else {
            let selected = await Category.findOneAndUpdate(
                { _id: id },
                { $unset: { offer: "" } }
            )
        }



        res.json({ status: true })






    } catch (error) {

        console.log('an error rendering remove offer:', error)
    }
}












module.exports = {
    addProduct,
    loadAddProduct,
    loadproduct,
    blockProduct,
    editProductLoad,
    edit_product,
    saveOffer,
    removeOffer

}





