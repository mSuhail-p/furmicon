const Admin = require('../model/Admin')
const User = require('../model/userModel')
const Category = require('../model/category');
const offer = require('../model/OfferModel')
const Product = require('../model/product')
const Order = require('../model/order')


const bcrypt = require('bcrypt')








const securepassword = async (password) => {
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash

    } catch (error) {
        console.log(error);
    }
}


const loadLogin = async (req, res) => {
    try {
        res.render('admin/loginAdmin')
    } catch (error) {
        console.log(error)
    }
}



const verifyLogin = async (req, res) => {
    try {

        const email = req.body.email;
        const password = await securepassword(req.body.password);


        const credential = await Admin.findOne({ email: email });


        if (credential) {
            const passwordmatching = await bcrypt.compare(credential.password, password)

            if (passwordmatching) {
                req.session.admin = credential._id;


                // res.render('admin/dashboad')
                res.redirect('/admin/dashboad')

            } else {
                res.redirect('/admin');
            }
        } res.redirect('/admin')



    } catch (error) {
        console.log(error)
    }
}

const dashboad = async (req, res) => {
    try {



        let productCount = await Product.find().count()
        let categoryCount = await Category.find().count()

        let counts = [productCount, categoryCount]

        let orders = await Order.aggregate([
            {
                $match: { orderStatus: { $ne: 'Cancelled' } }
            }, { $group: { _id: '', count: { $sum: 1 }, totalRevenue: { $sum: '$subTotal' } } }
        ])


        let orderMonth = await Order.aggregate([
            { $match: { orderStatus: { $ne: 'Cancelled' } } },
            {
                $group: {
                    _id: {
                        month: { $month: '$orderedTime' }
                    }, totalIncome: { $sum: '$subTotal' }
                }
            },
            {
                $addFields: {
                    monthName: {
                        $arrayElemAt: [
                            ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            { $subtract: ["$_id.month", 1] }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: '$_id.month',
                    totalIncome: 1,
                    monthName: 1
                }
            }
        ])


        let orderYear = await Order.aggregate([
            { $match: { orderStatus: { $ne: 'Cancelled' } } },
            {
                $group: {
                    _id: {
                        year: { $year: '$orderedTime' },
                    }, totalIncome: { $sum: '$subTotal' }
                }
            }

        ])


         



        let bestProduct = await Order.aggregate([

            { $unwind: '$orderedProducts' },

            {
                $group: {
                    _id: '$orderedProducts.productId',
                    totalCount: { $sum: '$orderedProducts.quantity' } // Sum the quantities ordered
                }
            },

            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },

            { $unwind: '$product' },

            {
                $lookup: {
                    from: 'categories',
                    localField: 'product.category',
                    foreignField: '_id',
                    as: 'category'
                }
            },

            { $unwind: '$category' },

            {
                $project: {
                    _id: 1,
                    totalCount: 1,
                    'product.name': 1,
                    'category.name': 1,
                    'product.images':1,
                    'product.quantity':1
                }
            },

            { $sort: { totalCount: -1 } },
            {$limit:5}
        ])




        let bestCategory = await Order.aggregate([
            { $unwind: '$orderedProducts' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderedProducts.productId', // Correct field
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: '$product.category', // Correctly reference the product category
                    totalCategoryCount: { $sum: 1 } // Summing the quantities
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id', // Correct field
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {$project:{_id:1,'category.name':1,totalCategoryCount:1}},
            { $sort: { totalCategoryCount: -1 } }, // Correct field
            { $limit: 5 }
        ])
        

        console.log(bestCategory , 'it is best category')

        // let bestCategory = bestProduct.aggregate([
        //     {$group:{_id:'$product.category',totalCount:{$sum:1}}}
        // ])




        res.render('admin/dashboad.ejs', { orders, counts, orderMonth, orderYear , bestProduct ,bestCategory });
    } catch (error) {
        console.log(error);
    }
}




const costomer = async (req, res) => {
    try {
        res.render('admin/costomer.ejs');
    } catch (error) {
        console.log(error);
    }
}


const userlist = async (req, res) => {
    try {

        const users = await User.find({ is_verified: 1 });
        res.render('admin/costomer', { users })



    } catch (error) {
        console.log(error)
    }
}




const addCategory = async (req, res) => {
    try {


        // const exist = await Category.find({ name: new RegExp(req.body.name, 'i') }).exec();
        const exist = await Category.find({ name: new RegExp(req.body.name.trim(), 'i') }).exec();




        if (exist.length == 0 && req.body.name.trim() != "") {


            const categories = new Category({
                name: req.body.name,
                description: req.body.description
            })

            const category = await categories.save();



            const message = '/admin/category'
            res.json({ message })

        } else {

            res.json({ message: false })
            // const exist
            // const wrong='An item with the provided details already exists. Please add a new item with unique details'
            // res.render('admin/category',{exist});
            // res.redirect('/admin/category')
            // res.send("wrong")

        }

    } catch (error) {
        console.log(error + "lslfklsdflksd");
    }
}





const loadCategory = async (req, res) => {
    try {

        const allCategory = await Category.find({}).populate('offer')
        const categoryOffer = await offer.find({ type: 'category' })




        // const checking = Category.find({status:false})

        res.render('admin/category', { allCategory, categoryOffer });



    } catch (error) {
        console.log(error)
    }
}



const userBlock = async (req, res) => {
    try {

        const { userId } = req.params;


        const isblock = await User.findOne({ _id: userId });
        if (isblock.is_blocked === false) {



            await User.updateOne({ _id: isblock._id }, { $set: { is_blocked: true } })

            res.redirect('/admin/costomer')


            //    res.render('admin/costomer.ejs')
        } else {


            await User.updateOne({ _id: isblock._id }, { $set: { is_blocked: false } })
            res.redirect('/admin/costomer')


            //   res.render('admin/costomer.ejs')

        }

    } catch (error) {
        console.log(error)
    }
}


const editCategoryLoad = async (req, res) => {
    try {

        const { categoryId } = req.params
        const editCategory = await Category.findOne({ _id: categoryId }).populate('offer')
        const categoryOffer = await offer.find({ type: 'category' })


        res.render('admin/editCategory', { editCategory, categoryOffer })

    } catch (error) {
        console.log(error)
    }
}


const saveCategoryOffer = async (req, res) => {
    try {

        const { catOfferId } = req.params
        const { categoryId } = req.params

        // const selectedOffer = await Offer.findOne({ _id: offerId })
        // const offeredCategory = await Product.findOne({ _id: productId })
        // let offerPrice = offeredProduct.price - (selectedOffer.offPercentage / 100) * offeredProduct.price
        let addOffer = await Category.findOneAndUpdate({ _id: categoryId }, { $set: { offer: catOfferId } })
        console.log(addOffer, 'it is addoffer')

        res.json({ status: true })






    } catch (error) {

        console.log('an error rendering saveOffer:', error)
    }
}








const editingCategory = async (req, res) => {
    try {


        const categoryId = req.params.catergory_id

        const allCategory = await Category.find({});

        // const currentCategory = await Category.findOne({ _id: categoryId });
        const duplecate = allCategory.filter((element) => {

            if (element.name === req.body.name || element.name == req.body.name.trim()) {
                return element.name;
            }


        })




        if (duplecate.length === 0 && req.body.name.trim() !== "") {

            await Category.updateMany({ _id: categoryId }, { $set: { name: req.body.name, description: req.body.description } })

            res.json({ message: '/admin/category' })

        } else {
            res.json({ message: 'existing' })

        }


    } catch (error) {
        console.log(error);
    }
}










const deleteCategory = async (req, res) => {
    try {
        const category = req.params.category
         

        const status = await Category.findOne({ _id: category });
        if (status.status) {
            const changing = await Category.findOneAndUpdate({ _id: category }, { $set: { status: false } }, { new: true })
            // await Product.updateMany({category:category},{$set:{is_blocked:0}})
            res.json({ changing })

            


        } else {

            const changing = await Category.findOneAndUpdate({ _id: category }, { $set: { status: true } }, { new: true })
            res.json({ changing })


        }


    } catch (error) {
        console.log(error);
    }
}


const logout = async (req, res) => {
    try {

        req.session.admin = null
        res.redirect('/admin')


    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    verifyLogin,
    loadLogin,
    dashboad,
    costomer,
    userlist,
    userBlock,
    loadCategory,
    addCategory,
    editCategoryLoad,
    saveCategoryOffer,
    deleteCategory,
    editingCategory,
    logout
}