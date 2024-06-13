const Product = require('../model/product');
const Wishlist = require('../model/wishlist')




const viewWishlist = async (req, res) => {
    try {
        const { user_id } = req.session
        const wishlist = await Wishlist.find({ userId: user_id }).populate({
            path: 'products.productId',
            model: 'Product' // Optional, but makes it explicit which model to use
        });


        console.log(wishlist)

        res.render('user/wishlist', { wishlist })


    } catch (error) {
        console.log('it is error for rendering wishlist:', error)
    }
}

const addToWishlist = async (req, res) => {
    try {

        let { productID } = req.params
        const { user_id } = req.session
        let findWishlist = await Wishlist.find({ userId: user_id })
        const existing = await Wishlist.find({
            userId: user_id,
            products: { $elemMatch: { productId: productID } }
        });

        if (findWishlist.length > 0) {
            if (existing.length == 0) {

                let update = await Wishlist.updateOne(
                    { userId: user_id },
                    { $addToSet: { products: { productId: productID } } }
                );

            } else {
                console.log('it is already exist')
            }

        } else {
            let wishlist = new Wishlist({
                userId: user_id,
                products: [{ productId: productID }]
            })

            let savewishlist = await wishlist.save()
            console.log(savewishlist)

        }

    } catch (error) {
        console.log('it is error for rendering wishlist:', error)
    }
}


const removeWishlist = async (req, res) => {
    try {

        const { productId } = req.params

         await Wishlist.updateOne(
            { 'products._id': productId },
            { $pull: { products: { _id: productId } } }
        );
        const removed = true 
        res.json({ removed })




    } catch (error) {
        console.log('it is error for rendering removeWishlist:', error)
    }
}




module.exports = {

    viewWishlist,
    addToWishlist,
    removeWishlist
}