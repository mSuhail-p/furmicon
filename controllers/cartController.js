
let axios = require('axios')

let Cart = require('../model/Cart');






// const viewCart = async (req, res) => {
//     try {
//         res.render('user/cart')

//     } catch (error) {
//         console.log(error);

//     }
// }

const addToCart = async (req, res) => {
    try {

        console.log("it is add to cart")


        let isNewCart = await Cart.find({ userId: req.session.user_id })
        if (isNewCart && isNewCart.length > 0) {

            let existingProduct = await Cart.findOne({ $and: [{ Products: { $elemMatch: { productId: req.params.productId } } }, { userId: req.session.user_id }] })
            if (existingProduct) {

                res.json({ message: false })

            } else {

                const cart = await Cart.findOne({ userId: req.session.user_id });
                cart.Products.addToSet({ productId: req.params.productId, quantity: req.params.quantity });
                let cartUpdate = await cart.save();

                res.json({ status: true })
            }

        } else {


            let productID = req.params.productId;
            let userId = req.session.user_id
            let quantity = req.params.quantity


            let newCart = new Cart({
                userId: userId,
                Products: [{ productId: productID, quantity: quantity }],
                shippingCharge:50
            });

            let cartAdded = await newCart.save();

            res.json({ status: true })
        }


    } catch (error) {
        console.log(error)
    }
}


const viewCart = async (req, res) => {

    try {

        let displayCart = await Cart.find({ userId: req.session.user_id }).populate('userId').populate({
            path: 'Products',
            populate: { path: 'productId' }
        })

        // console.log(displayCart[0].Products[0].productId.images, 'it is images')
        res.render('user/cart', { displayCart })
    } catch (error) {
        console.log(error)
    }


}

const removeCart = async (req, res) => {
    try {

        let productId = req.params.productId
        await Cart.updateOne(
            { 'Products.productId': productId },
            { $pull: { 'Products': { 'productId': productId } } }
        );

        res.json({ message: 'removed' })


    } catch (error) {
        console.log(error)
    }
}


const productQuantity = async (req, res) => {
    try {
        const { currentQuantity, productId } = req.body
        const { user_id } = req.session

        console.log(currentQuantity, productId)
        const edited = await Cart.updateOne(
            { "Products._id": productId },
            { $set: { "Products.$.quantity": currentQuantity } }
        )
        const cartDocument = await Cart.findOne({ userId: user_id }).populate('userId').populate({
            path: 'Products',
            populate: { path: 'productId' }
        })
        res.json({ cartDocument })



    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    viewCart,
    addToCart,
    removeCart,
    productQuantity,



}
