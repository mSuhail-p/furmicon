
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
                    totalCount: { $sum: 1 }, totalRevenue: { $sum: '$subTotal' }
                }
            }, { $sort: { _id: -1 } }
        ]);


        console.log(report, 'it is report')
        res.render('admin/salesReport', { report })


    } catch (error) {
        console.log('error rendering getsales report :', error)
    }
}





let getInvoice = async (req, res) => {
    try {
        let { orderId } = req.query
        let order = await Order.find({ _id: orderId }).populate({
            path: 'orderedProducts.productId',
            model: 'Product'

        })
        // console.log(order[0].orderedProducts[0].productId.price)
        // console.log(order,'it is orderi id')
        res.render('user/Invoice', { order })



    } catch (error) {
        console.log('error rendering getInvoice:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the getInvoice' })
    }
}

let searchWithDate = async (req, res) => {
    try {

        let { searcheDate } = req.body
        let searchedDate = new Date(searcheDate)



        let report = await Order.aggregate([

            { $match: { orderedTime: { $gt: searchedDate } } }, {
                $group: {
                    _id: "$purchasedDate",
                    totalCount: { $sum: 1 }, totalRevenue: { $sum: '$subTotal' }
                }
            }, { $sort: { _id: -1 } }
        ]);

        res.render('admin/salesReport', { report })


    } catch (error) {

        console.log('error rendering searchWithDate', error)
    }
}


let sortReport = async (req, res) => {
    try {
        let { sort } = req.query
        if (sort == 'Day') {
            let tody = new Date()

            let report = await Order.aggregate([

                { $match: { orderedTime: { $eq: tody } } }, {
                    $group: {
                        _id: "$purchasedDate",
                        totalCount: { $sum: 1 }, totalRevenue: { $sum: '$subTotal' }
                    }
                }, { $sort: { _id: -1 } }
            ])
            console.log(report,'it is reporrt')

        }


    } catch (error) {

        console.log('error rendering sortReport', error)
    }
}



module.exports = {

    getOrder,
    changeOrderStatus,
    getSalesReport,
    getInvoice,
    searchWithDate,
    sortReport
}