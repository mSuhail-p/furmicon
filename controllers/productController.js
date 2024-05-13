const Product = require('../model/product')
const Category = require('../model/category')
const mongoose = require('mongoose');
const fs = require('fs');
const { product } = require('./adminController');
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

        const liproduct = await Product.find({}).populate('category')

        if (liproduct) {
            console.log(liproduct[0].category + "categoryyyyyyyyyyyyyyyyyy")

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
        const categories = await Category.find({})
        // console.log(categories)

        const sendToEdit = await Product.findOne({ _id: productid }).populate('category')

        // console.log(sendToEdit.category)

        console.log(sendToEdit)



        res.render('admin/editProduct', { sendToEdit, categories });


    } catch (error) {
        console.log('error')
    }
}


const edit_product = async (req, res) => {
    try {

        // const {name,category,quantity,price,description}=req.body
        let productId = req.params.productId

        const images = req.files.map(file => file.filename);
        const proData = await Product.findOneAndUpdate({ _id: productId }, {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            images: images,
            description: req.body.description
        })


        // await proData.save();
        res.redirect('/admin/product')

    } catch (error) {
        console.log(error)
    }
}












module.exports = {
    addProduct,
    loadAddProduct,
    loadproduct,
    blockProduct,
    editProductLoad,
    edit_product,

}





