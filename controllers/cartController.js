
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


        let isNewCart = await Cart.find({ userId: req.session.user_id })
        if (isNewCart && isNewCart.length > 0) {
            //if here is already that productId , quantity should be increased
            let existingProduct = await Cart.findOne({ Products: { $elemMatch: { productId: req.params.productId } } })
            if (existingProduct) {

                ///////////////////////////////////////////////////
                let quantityIncrement = await Cart.updateOne(
                    { 'Products.productId': productId }, // Query condition to find the document with the specified productId within the products array
                    { $inc: { 'Products.$.quantity': 1 } } // Use $inc operator to increment the quantity field of the matching product
                )
                console.log(quantityIncrement + "it is quanity increment")
                //////////////////////////////////////////////////////////////////
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
                Products: [{ productId: productID, quantity: quantity }]
            });

            let cartAdded = await newCart.save();

            res.json({ status: true })
        }


    } catch (error) {
        console.log(error)
    }
}


let viewCart = async (req, res) => {

    try {

        let displayCart = await Cart.findOne({ userId: req.session.user_id }).populate('userId').populate({path: 'Products',
            populate: { path: 'productId' }})


        console.log(displayCart.Products[0].productId.name)
        res.render('user/cart', { displayCart })
    } catch (error) {   
        console.log(error)
    }


}

let removeCart = async(req,res)=>{
    try {

        let productId = req.params.productId
        let update =await Cart.updateOne(
            { 'Products.productId': productId },
            { $pull: { 'Products': { 'productId': productId } } }
        );
        
        
        
        console.log(update +"finished")

        console.log(productId+"reached at remove")

    }catch(error){
        console.log(error)
    }
}




module.exports = {
    viewCart,
    addToCart,
    removeCart


}
