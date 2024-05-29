
const Address = require('../model/Address')
const Order = require('../model/order')
const Product = require('../model/product')
const Cart = require('../model/Cart')
const { cart } = require('../middleware/auth')






let getCheckout = async (req, res) => {

    try {
        const { user_id } = req.session
        const address = await Address.find({ userId: user_id })
        const cart = await Cart.findOne({ userId: user_id }).populate('Products.productId')
        let displayCart = [];


        if (cart.Products.length > 0) {

            res.render('user/checkout', { address,cart })
        } else {

            res.render('user/cart', { displayCart, cartEmty: 'cart is emty' })
        }




    } catch (error) {
        console.log(error)
    }
}



let placeOrder = async (req, res) => {

    try {

        let { paymentMethod, tableData, addressId, formData } = req.body
        const { user_id } = req.session
        const userCart = await Cart.findOne({ userId: user_id }).populate('Products.productId')
        const selectedAddress = await Address.findOne({ _id: addressId });

        let status = paymentMethod == 'Cash on delivery' ? 'Placed' : 'Pending'


        let productItems = userCart.Products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            price: product.productId.price,
            totalPrice: product.productId.price * product.quantity,
            status:'Placed'

        }))

        let subTotal = userCart.Products.reduce((total, current) => total + current.productId.price * current.quantity, 0)

        console.log(subTotal, 'it is subtotal')



        if (paymentMethod == 'Cash on delivery') {
            if (addressId != undefined) {
                let storeOrder = new Order({
                    userId: user_id,
                    userName: selectedAddress.firstName,
                    shipAddress: [{ name: selectedAddress.firstName, country: selectedAddress.country, state: selectedAddress.state, city: selectedAddress.town, streetName: selectedAddress.streetName, pinCode: selectedAddress.postCode, phone: selectedAddress.phone, email: selectedAddress.email }],
                    orderedProducts: productItems,
                    purchasedDate: new Date().toDateString(),
                    paymentMethod: paymentMethod,
                    subTotal: subTotal,
                    orderStatus: status


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id

                res.status(200).json({ codSuccess: true, orderId })





            } else {
                console.log(formData, "it is form data")
                let createAdress = new Address({
                    userId: user_id,
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    country: formData.country,
                    streetName: formData.streetname,
                    town: formData.town,
                    state: formData.state,
                    postCode: formData.postcode,
                    phone: formData.phone,
                    email: formData.mail

                })

                let newAddress = await createAdress.save()


                let storeOrder = new Order({
                    userId: user_id,
                    userName: newAddress.firstName,
                    shipAddress: [{ name: newAddress.firstName, country: newAddress.country, state: newAddress.state, city: newAddress.town, streetName: newAddress.streetName, pinCode: newAddress.postCode, phone: newAddress.phone, email: newAddress.email }],
                    orderedProducts: productItems,
                    purchasedDate: new Date().toDateString(),
                    paymentMethod: paymentMethod,
                    subTotal: subTotal,
                    orderStatus: status


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                console.log(resultofOrder, 'it is form formdata')
                res.status(200).json({ codSuccess: true, orderId })


            }
        } else {
            console.log('it another methos')
            const orderId = 'dflsdkls'
            res.status(404).json({ codSuccess: false,orderId})
        }


        if (status == 'Placed') {
            for (const item of productItems) {
                await Product.updateOne({ _id: item.productId },
                    { $inc: { quantity: -item.quantity } }
                )

            }

            //Aftet placing order , delete cart document
            await Cart.deleteOne({ userId: user_id })


            console.log('quanitry decreased')
        }




    } catch (error) {
        console.log(error, 'it is error')
    }
}


const orderPlaced = async (req, res) => {

    try {
        const {orderId} = req.params
        console.log(orderId,'it is confirmation')

        res.render('user/confirmation')


    } catch (error) {
        console.log(error)

    }
}



module.exports = {
    getCheckout,
    placeOrder,
    orderPlaced

}