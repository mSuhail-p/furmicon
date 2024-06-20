
const Order = require('../model/order')
const Product = require('../model/product')




const getOrder = async (req, res) => {
    try {

        let Orderdoc = await Order.find({}).populate({
            path: 'orderedProducts.productId',
            model: 'Product'
        }).sort({ orderedTime: -1 })
        console.log(Orderdoc[0].orderedProducts[0].productId.price)

        res.render('admin/order', { Orderdoc })




    } catch (error) {

        console.log(error)
    }
}



const changeOrderStatus = async (req, res) => {
    try {

        const { productId } = req.params
        const { status } = req.params
        const { exactProductId } = req.params
        let changeStatus = await Order.updateOne(
            { 'orderedProducts._id': productId },
            { $set: { 'orderedProducts.$.status': status } }
        )

        if (status == 'Cancel') {

            await Product.updateOne({ _id: exactProductId }, { $inc: { quantity: 1 } })

        } else if (status == 'Placed') {
            await Product.updateOne({ _id: exactProductId }, { $inc: { quantity: -1 } })
        }


        res.redirect('/admin/orders')







    } catch (error) {

        console.log(error)
    }
}

let getSalesReport = async (req, res) => {
    try {
        let order = await Order.find({})
        console.log(order)
        let report = await Order.aggregate([

            {
                $group: {
                    _id: "$purchasedDate",
                    totalCount: { $sum: 1 },totalRevenue:{$sum:'$subTotal'}
                }
            },{$sort:{_id:-1}}
        ]);


        console.log(report, 'it is report')
        res.render('admin/salesReport',{report})


    } catch (error) {
        console.log('error rendering getsales report :', error)
    }
}


module.exports = {

    getOrder,
    changeOrderStatus,
    getSalesReport
}