
const Address = require('../model/Address')
const Order = require('../model/order')
const Product = require('../model/product')
const Cart = require('../model/Cart')
const { cart } = require('../middleware/auth')
const Razorpay = require('razorpay');
var crypto = require('crypto')
const Wallet = require('../model/walletModel')

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});







let getCheckout = async (req, res) => {

    try {
        const { user_id } = req.session
        const address = await Address.find({ userId: user_id })
        const cart = await Cart.findOne({ userId: user_id }).populate('Products.productId')
        const wallet = await Wallet.findOne({ userId: user_id });
        let displayCart = [];



        if (cart.Products.length > 0) {

            res.render('user/checkout', { address, cart, wallet })
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
            price: product.productId.offerPrice,
            totalPrice: product.productId.price * product.quantity,
            status: 'Placed'

        }))

        let subTotal = userCart.Products.reduce((total, current) => total + current.productId.offerPrice * current.quantity, 0)


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
                    orderedTime: Date(),
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
                    orderedTime: Date(),
                    orderStatus: status


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                console.log(resultofOrder, 'it is form formdata')
                res.status(200).json({ codSuccess: true, orderId })


            }
        } else if (paymentMethod == 'Online Payment') {

            let orderData = {
                addressId,
                paymentMethod,
                formData

            }

            instance.orders.create({
                amount: subTotal * 100,
                currency: "INR",
                receipt: "receipt#1",

            }, (err, order) => {
                console.log(order, "it is razor pay ")
                res.json({ order, orderData })
            })

        } else if (paymentMethod == 'Wallet') {

            if (addressId != undefined) {
                let storeOrder = new Order({
                    userId: user_id,
                    userName: selectedAddress.firstName,
                    shipAddress: [{ name: selectedAddress.firstName, country: selectedAddress.country, state: selectedAddress.state, city: selectedAddress.town, streetName: selectedAddress.streetName, pinCode: selectedAddress.postCode, phone: selectedAddress.phone, email: selectedAddress.email }],
                    orderedProducts: productItems,
                    purchasedDate: new Date().toDateString(),
                    paymentMethod: paymentMethod,
                    subTotal: subTotal,
                    orderedTime: new Date(),
                    orderStatus: 'Placed'


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                orderPlacing(orderId)





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
                    orderedTime: new Date(),
                    orderStatus: 'Placed'


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                console.log(resultofOrder, 'it is form formdata')

                orderPlacing(orderId)

            }

            async function orderPlacing(orderId) {

                let wallet = await Wallet.updateOne({ userId: user_id }, {
                    $inc: { balance: -subTotal },
                    $push: {
                        history: {
                            Date: new Date().toDateString(),
                            Description: 'Product ordered',
                            Amount: `- ${subTotal}`,
                            time: new Date()
                        }
                    }
                })



                for (const item of productItems) {
                    await Product.updateOne({ _id: item.productId },
                        { $inc: { quantity: -item.quantity } }
                    )

                }

                //Aftet placing order , delete cart document
                await Cart.deleteOne({ userId: user_id })


                console.log('quanitry decreased')


                res.status(200).json({ Success: true, orderId })

            }


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
        const { orderId } = req.params
        console.log(orderId, 'it is confirmation')

        res.render('user/confirmation')


    } catch (error) {
        console.log(error)

    }
}



const verifyPayment = async (req, res) => {

    try {
        console.log('verifypayment')
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.response
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        // Compare the signatures
        if (generated_signature === razorpay_signature) {
            console.log("Order placed successfully");


            const { addressId, paymentMethod, formData } = req.body.orderData
            console.log(addressId, paymentMethod, formData, "it is oreder data")

            const { user_id } = req.session
            const userCart = await Cart.findOne({ userId: user_id }).populate('Products.productId')
            let subTotal = userCart.Products.reduce((total, current) => total + current.productId.offerPrice * current.quantity, 0)


            let productItems = userCart.Products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.productId.offerPrice,
                totalPrice: product.productId.price * product.quantity,
                status: 'Placed'

            }))


            if (addressId != undefined) {
                let selectedAddress = await Address.findOne({})

                let storeOrder = new Order({
                    userId: user_id,
                    userName: selectedAddress.firstName,
                    shipAddress: [{ name: selectedAddress.firstName, country: selectedAddress.country, state: selectedAddress.state, city: selectedAddress.town, streetName: selectedAddress.streetName, pinCode: selectedAddress.postCode, phone: selectedAddress.phone, email: selectedAddress.email }],
                    orderedProducts: productItems,
                    purchasedDate: new Date().toDateString(),
                    paymentMethod: paymentMethod,
                    subTotal: subTotal,
                    orderedTime: new Date(),
                    orderStatus: 'Placed'


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                orderPlaced(orderId)






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
                    orderedTime: new Date(),
                    orderStatus: 'Placed'


                })

                let resultofOrder = await storeOrder.save()
                const orderId = resultofOrder._id
                console.log(resultofOrder, 'it is form formdata')
                orderPlaced(orderId)


            }
            async function orderPlaced(orderId) {

                for (const item of productItems) {
                    await Product.updateOne({ _id: item.productId },
                        { $inc: { quantity: -item.quantity } }
                    )

                }

                //Aftet placing order , delete cart document
                await Cart.deleteOne({ userId: user_id })
                console.log('quanitry decreased')



                res.status(200).json({ Success: true, orderId })
            }


        } else {
            console.log("Signature verification failed");
        }



    } catch (error) {
        console.log(error)

    }
}





module.exports = {
    getCheckout,
    placeOrder,
    orderPlaced,
    verifyPayment

}